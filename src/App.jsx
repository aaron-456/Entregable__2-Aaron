import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import WheaterCard from './components/WheaterCard'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setweather] = useState()
  const [temperture, setTemperture] = useState()
  const [isLodding, setIsLodding] = useState(true)

  useEffect(()=>{

    const success = pos => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(obj)
    }
    navigator.geolocation.getCurrentPosition(success)
  },[])

  useEffect(()=>{

    if(coords){
      const APIKey ="b3b27df6b3234ef23b42ff9104693bea"
      const url =`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKey}`

      axios.get(url)
      .then( res=>{
        setweather(res.data)
        const obj = {
          celsius:(res.data.main.temp-273.15).toFixed(1),
          farenheit:((res.data.main.temp-273.15)*9/5+32).toFixed(1)
        }
        setTemperture(obj)
      })
      .catch(err=>console.log(err))
      .finally(()=>setIsLodding(false))
    }
    
    
  },[coords])

  
return (
    <div className="App">
      {isLodding?
        <h1>Lodding....</h1>
        :
        <WheaterCard 
        weather={weather}
        temperture={temperture}
  
        />
      }
      
    </div>
  )
}

export default App
