// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./button";
import BackButton from './BackButton'
import {usePosition} from '../hooks/usePosition'
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/citiesContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat,lng] = usePosition()
  const [cityName, setCityName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [country, setCountry] = useState("");
  const [errMsg, setErrorMsg] = useState('')
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const {createCity} = useCities()

  useEffect(function(){
    async function fetchCity(){
      try{
        setErrorMsg('')
        const response = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await response.json()
        if(!data.countryCode){
          throw new Error('Click somewhere else😊')
        }
        setCityName(data.city)
        setEmoji(convertToEmoji(data.countryCode))
        setCountry(data.countryName)
      } catch(err){
        setErrorMsg(err.message)
      } 
    }

    fetchCity()
  },[lat,lng])

  const navigate = useNavigate()

async function handleSubmit(e){
  e.preventDefault()
  const obj = {
    cityName,
    country,
    emoji,
    date,
    notes,
    position:{
      lat,lng
    }
  }
  await createCity(obj)
  navigate('/app/cities')
}

  if(errMsg){
    return(
      <Message message={errMsg}>
      </Message>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker onChange={(e) => setDate(e)} selected={date}></DatePicker>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton></BackButton>
      </div>
    </form>
  );
}

export default Form;
