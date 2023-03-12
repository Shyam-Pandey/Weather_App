import axios from 'axios';
import { useState } from 'react';
import './App.css';
function App() {
  const apiCity = "808352800e04e9fc6eb92668fa609f99"
  const [data, setdata] = useState({})
  const [input, setInput] = useState("")

  const getWeather = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiCity
    axios.get(apiURL).then((res) => {
      console.log("response", res)
      setdata(res.data)
    }).then((err) => {
      console.log("error", err)
    })
  }
  const changeHandler = (e) => {
    console.log(e.target.value)
    setInput(e.target.value)
  }

  const searchCity = () => {
    getWeather(input)
  }

  return (
    <>
      <nav className='navBar'>
        <h1 className='app_headtext'>WeatherCheck</h1>
        <div className='input-btn'>
          <input type='text' className='searchbar' placeholder='Enter City Name...' value={input} onChange={changeHandler} />
          <button className='btn-search' onClick={searchCity}>Search</button>
        </div>
      </nav>
      <div className='bg-weather'>
      {/* <img src="https://images.unsplash.com/photo-1503125210483-8b1d12bccdbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt='bg'/> */}
        {Object.keys(data).length > 0 &&
          <div>
            <div className='showResult'>
              <img className="weathorIcon" alt='bg'
                src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" />
              <h1 className='city'>{data?.name}</h1>
              <h1 className='temperature'>{`${(data?.main?.temp - (273)).toFixed(2)}°C`}</h1>
              <div className='tempShow'>
                <h6 className='minMaxTemperature'>{`Min ${(data?.main?.temp_min - (273)).toFixed(2)}°C`}</h6>
                <h6 className='minMaxTemperature'>{`Max ${(data?.main?.temp_max - (273)).toFixed(2)}°C`}</h6>
              </div>
            </div>
            <div className='otherDetails'>
              <h2>Other Details</h2>
              <div className='details-box'>
                <span className='card-details feelsLike'>
                  <h6>Feels Like</h6>
                  <h6>{data?.main?.feels_like}</h6>
                </span>

                <span className='card-details wind'>
                  <h6>Wind</h6>
                  <h6>{`${data?.wind?.speed} km/h`}</h6>
                </span>
                <span className='card-details humidity'>
                  <h6>Humidity</h6>
                  <h6>{`${data?.main?.humidity} %`}</h6>
                </span>

                <span className='card-details weather'>
                  <h6>Weather</h6>
                  <h6>{data?.weather[0]?.description}</h6>
                </span>
                <span className=' card-details visibility'>
                  <h6>Visibility</h6>
                  <h6>{`${(data?.visibility) / 1000} km`}</h6>
                </span>
                <span className=' card-details pressure'>
                  <h6>Air pressure</h6>
                  <h6>{`${data?.main?.pressure} hPa`}</h6>
                </span>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default App;
