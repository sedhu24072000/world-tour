import styles from './CityList.module.css'
import CityItem from './cityItem'
import Spinner from './Spinner'
import { useCities } from '../contexts/citiesContext'

function CityList(){
    const{cities,isLoading} = useCities()
    if(isLoading) return <Spinner></Spinner>
    return(
       
        <ul className={styles.cityList}>{cities.map(cities => <CityItem city={cities} key={cities.id}></CityItem>)}</ul>
    )
}

export default CityList