import { Link } from 'react-router-dom';
import style from './CityItem.module.css'
import { useCities } from '../contexts/citiesContext';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

function CityItem({city}){
    const {cityName,emoji,date,id,position} = city
    const {currentCity} = useCities()
    const lat = position.lat
    const lng = position.lng

    const {deleteCity} = useCities()

    const handleDelete =(e) =>{
      e.preventDefault()
      deleteCity(id)
    }
    return(
       <li>
        <Link to={`${id}?lat=${lat}&lng=${lng}`} className={`${style.cityItem} ${id === currentCity.id ? style['cityItem--active'] : ""}`} >
        <span className={style.emoji}>{emoji}</span>
        <span className={style.name}>{cityName}</span>
        <span className={style.date}>{formatDate(date)}</span>
        <button className={style.deleteBtn} onClick={handleDelete}>&times;</button>
        </Link>
       </li>
    )
}

export default CityItem