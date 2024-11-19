import { useCities } from '../contexts/citiesContext'
import styles from './CountryList.module.css'
import CountryItem from './countryItem'

function CountryList(){
    const{cities}  = useCities()
    const countryLists = cities.reduce((arr,current) => {
        if(!arr.map(el => el.country).includes(current.country)){
            return [...arr,{country: current.country,emoji:current.emoji}]
        }
        else{
            return arr
        }
    },[])
    return(
        <ul className={styles.countryList}>
            {countryLists.map((e,i) => <CountryItem country={e} key={i}></CountryItem>)}
        </ul>
    )
}

export default CountryList