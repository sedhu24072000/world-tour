import { createContext, useContext ,useEffect, useReducer} from "react"

const BASE_URL = "https://6734d4f55995834c8a9109dc.mockapi.io/api/v1/places"

const CityContext = createContext()

const initialState = {
  cities : [],
  isLoading : false,
  currentCity : {},
  error:''
}

function reducer (state,action){
  switch(action.type){
    case 'city/isLoading':
      return {...state,isLoading:true}
    case 'city/loaded':
      return {...state,isLoading:false, cities: action.payload}
    case 'city/current':
      return {...state,currentCity:action.payload,isLoading:false}
    case 'city/created':
      return {...state,isLoading:false,cities: [...state.cities,action.payload],currentCity:action.payload}
    case 'city/delete':
      return {...state,isLoading:false, cities: action.payload}
    case 'city/error':
      return {...state, error:'something went wrong💥'}
    default:
      return {...state, error:'something went wrong💥'}
  }
}

function ContextFunction({children}){
    // const [cities,setCities] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    // const [currentCity,setCurrentCity] = useState({})
  const [{cities,isLoading,currentCity}, dispatch] = useReducer(reducer,initialState)

  useEffect(function(){
    async function fetchCities(){
      dispatch({type:'city/isLoading'})
      try{
        const response = await fetch(`${BASE_URL}`)
        const data = await response.json()
        dispatch({type:'city/loaded',payload:data})
      }catch{
        dispatch({type:'city/error'})
      }
    }
    fetchCities()
  },[])

  async function getCity(id){
    dispatch({type:'city/isLoading'})
    try{
      const response = await fetch(`${BASE_URL}`)
      const res = await response.json()
      const output = res.filter((e) => e.id === id)
      const data = output[0]
      dispatch({type:'city/current',payload:data})
    }catch{
      dispatch({type:'city/error'})
    }
  }

  async function createCity(city){
    dispatch({type:'city/isLoading'})
    try{
      const response = await fetch(`${BASE_URL}`,{
        method: 'POST',
        body: JSON.stringify(city),
        headers : {
          'Content-Type' : 'application/json'
        }
      })
      const data = await response.json()
      dispatch({type:'city/created', payload:data})
    }catch{
      dispatch({type:'city/error'})
    }
  }

  async function deleteCity(id){
    dispatch({type:'city/isLoading'})
    try{
      await fetch(`${BASE_URL}/${id}`,{
        method : 'DELETE'
      })
     const data = cities.filter(e => e.id !== id)
     dispatch({type:'city/delete', payload:data})
    }catch{
      dispatch({type:'city/error'})
    }
  }

  return(
    <CityContext.Provider value={{cities,isLoading,currentCity,getCity,createCity,deleteCity}}>
        {children}
    </CityContext.Provider>
  )
}

function useCities(){
    const context = useContext(CityContext)
    return context
}




export {ContextFunction,useCities}