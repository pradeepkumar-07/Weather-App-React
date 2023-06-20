import React, { useState, useEffect } from "react"
import axios from "axios"

function App() {
  useEffect(() => {
    document.title = 'Weather App'; 
  }, []);

  const [data, setData] = useState({})
  const [error, setError] = useState('')
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=761877a71312637eab7250aea36150f7`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        setLocation('')
      })
        .catch(function (error) {
          console.log(error);
          setData("");
          setLocation("");
          setError({ message: "Not Found", query: location });
          alert("Invalid Input");
        });
    }
  }



  return (
    <div className="app">
      <div className="search">
        <p><strong>Weather App</strong></p>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      {data.name != undefined &&
        <div className="container">
          <div className="top">
            <div className="location">
              <p className="city">{data.name} , {data.sys.country}</p>

            </div>
            <div className="temp">
              <div>
                <h1>{data.main.temp.toFixed()}°C</h1>
              </div>
              <div>
                <img className="icon" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
                <p className="description" >{data.weather[0].main}</p>
              </div>
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">{data.main.humidity}%</p>
              <p>Humidity</p>

            </div>
            <div className="wind">
              <p className="bold">{data.wind.speed}MPH</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      }


    </div>

  );
}

export default App;
