import style from './Map.module.css'
import { MapContainer, TileLayer, Marker,Popup, useMap, useMapEvents } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import { useCities } from '../contexts/citiesContext'
import { useEffect, useState } from 'react'
import Button from './button'
import { useGeolocation } from '../hooks/useGeolocation'
import {usePosition} from '../hooks/usePosition'

function Map(){
    const [position,setPosition] = useState([40, 0])    
    
    const {isLoading:isGeoLoading, position:GeoPosition, getPosition} = useGeolocation()
    const [mapLat,mapLng] = usePosition()
    const {cities} = useCities()

    useEffect(function(){
        if(mapLat && mapLng){
            setPosition([mapLat,mapLng])
        }     
    },[mapLat,mapLng])

    useEffect(function(){
        if(GeoPosition){
            setPosition([GeoPosition.lat,GeoPosition.lng])
        }
    },[GeoPosition])

    const handleClick = () =>{
        getPosition()
    }
    return(
        <div className={style.mapContainer}>
            <MapContainer center={position} zoom={6} scrollWheelZoom={true} className={style.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities.map((city,i) => <Marker position={[city.position.lat,city.position.lng]} key={i}>
      <Popup>
       <span>{city.emoji}</span><span>{city.cityName}</span>
      </Popup>
    </Marker>)}
    <ChangeCenter position={position}></ChangeCenter>
    <DetectClick></DetectClick>
  </MapContainer>
  {!GeoPosition && <Button type='position' onclick={handleClick}>{isGeoLoading ? 'isLoading...' : 'USE MY POSITION'}</Button>}
        </div>
    )
}

function ChangeCenter({position}){
    const map = useMap()
    map.setView(position)
    return null
}

function DetectClick(){
    const navigate = useNavigate()
    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
}

export default Map