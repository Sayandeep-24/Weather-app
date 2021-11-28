import React, { useEffect, useState, useContext } from "react";
import DateConverter from "../Sidebar/DateConverter";
import { TemperatureContext } from "../../Store/temperature-context";

import clear from "../../images/Clear.png";
import Hail from "../../images/Hail.png";
import HeavyCloud from "../../images/HeavyCloud.png";
import HeavyRain from "../../images/HeavyRain.png";
import LightCloud from "../../images/LightCloud.png";
import LightRain from "../../images/LightRain.png";
import Shower from "../../images/Shower.png";
import Sleet from "../../images/Sleet.png";
import Snow from "../../images/Snow.png";
import Thunderstorm from "../../images/Thunderstorm.png";

export default function Card(props) {
  const [maxTemp, setmaxTemp] = useState();
  const [minTemp, setminTemp] = useState();
  const [date, setDate] = useState();
  const [weatherResult, setweatherResult] = useState();
  const temperatureCtx = useContext(TemperatureContext);
  const [Fmin, setFmin] = useState(0);
  const [Fmax, setFmax] = useState(0);
  let currentWeather = 0;

  function cToF(celsius) {
    let cTemp = celsius;
    let cToFahr = (cTemp * 9) / 5 + 32;
    return Math.round(cToFahr);
  }

  useEffect(() => {
    if (props.data) {
      setDate(props.data.consolidated_weather[props.id].applicable_date);
      setmaxTemp(
        Math.round(props.data.consolidated_weather[props.id].max_temp)
      );
      setminTemp(
        Math.round(props.data.consolidated_weather[props.id].min_temp)
      );
      currentWeather =
        props.data.consolidated_weather[props.id].weather_state_name;

      if (currentWeather === "Clear") setweatherResult(clear);
      else if (currentWeather === "Hail") setweatherResult(Hail);
      else if (currentWeather === "Heavy Cloud") setweatherResult(HeavyCloud);
      else if (currentWeather === "Heavy Rain") setweatherResult(HeavyRain);
      else if (currentWeather === "Light Cloud") setweatherResult(LightCloud);
      else if (currentWeather === "Light Rain") setweatherResult(LightRain);
      else if (currentWeather === "Showers") setweatherResult(Shower);
      else if (currentWeather === "Sleet") setweatherResult(Sleet);
      else if (currentWeather === "Snow") setweatherResult(Snow);
      else if (currentWeather === "Thunderstorm")
        setweatherResult(Thunderstorm);
    }
    setFmin(cToF(minTemp));
    setFmax(cToF(maxTemp));
  }, [props, temperatureCtx]);

  return (
    <div className="weather-card-wrap">
      <div className="weather-card">
        {props.id === 1 ? <div>Tommorow</div> : <DateConverter value={date} />}
        <div className='main-forecast-img'>
          <img src={weatherResult} className='card-img'/>
        </div>
        {temperatureCtx.isCelcius ? (
          <div className='forecast-maxmin'>
            
            <span>{maxTemp}°C</span>
            
            <span className='min-color'>{minTemp}°C</span>
          </div>
        ) : (
          <div className='forecast-maxmin'>
            
            <span>{Fmax}°F</span>
            
            <span className='min-color'>{Fmin}°F</span>
          </div>
        )}
      </div>
    </div>
  );
}
