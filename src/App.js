import React, { useState, useEffect } from "react"
import axios from "axios"

function App() {
  useEffect(() => {
    document.title = 'Weather App'; // Set the new page title here
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
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
              {data.weather ? <img className="icon" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" /> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>

            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed}MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      }


    </div>

  );
}

export default App;
