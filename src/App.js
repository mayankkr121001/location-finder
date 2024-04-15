
import { useState } from 'react';
import axios from 'axios';
import Map from './components/Map'

function App() {
  const [city, setCity] = useState("Delhi");
  const [location, setLocation] = useState({
    latitude: 28.6517178,
    longitude: 77.2219388
  })

  const onCityInput = (e)=>{
    const value = e.target.value;
    setCity(value);
  }

  const onCitySearch = ()=>{
    axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
    .then((response) =>{
      // console.log(response.data[0].lat);
      setLocation({latitude: response.data[0].lat, longitude: response.data[0].lon})
    })
    .catch((error) =>{
      console.log(error);
    })

  }

  return (
    <div >
      {/* Navbar */}
      <div className="w-screen h-[70px] bg-slate-800 flex items-center px-5 md:px-8">

        <div className='flex items-center gap-7'>

          <img className='h-6 w-6 md:h-10 md:w-10' src={require("./assets/map.png")} alt="logo" />
          <p className='text-white text-2xl md:text-3xl font-semibold'>Location Finder</p>

        </div>

      </div>

      <div className='w-screen h-[calc(100vh-70px)] relative '>
        {/* searchSection */}
        <div className='flex absolute left-[50%] transform translate-x-[-50%] mt-4 z-10' >
  
          <input onChange={onCityInput} className='py-[10px] px-5 w-[260px] rounded-tl-3xl rounded-bl-3xl outline-none border border-slate-300 border-r-0' type="text" placeholder='enter city name' />

          <button onClick={onCitySearch} className='bg-white px-3 sm:px-5 rounded-tr-3xl rounded-br-3xl border border-slate-300 border-l-0'><img className='h-5 w-5' src={require("./assets/search.png")} alt="" /></button>
        </div>

        <Map latitude={location.latitude} longitude={location.longitude} />

      </div>
    </div>
  );
}

export default App;
