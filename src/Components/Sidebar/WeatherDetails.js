import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DateConverter from "./DateConverter";
import { LocationContext } from "../../Store/location-context";


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

export default function WeatherDetails(props) {
  const [temp, setTemp] = useState(0);
  const [weatherResult, setweatherResult] = useState(null);
  const [currentWeather, setcurrentWeather] = useState(null);
  const [time, setTime] = useState();
  const locationCtx = useContext(LocationContext);


  useEffect(() => {
    axios.get(props.value).then((response) => {
      setcurrentWeather(
        response.data.consolidated_weather[0].weather_state_name
      );
      setTemp(Math.round(response.data.consolidated_weather[0].the_temp));
      setTime(response.data.time);  
      if (currentWeather === "Clear") setweatherResult(clear);
      else if (currentWeather === "Hail") setweatherResult(Hail);
      else if (currentWeather === "Heavy Cloud") setweatherResult(HeavyCloud);
      else if (currentWeather === "Heavy Rain") setweatherResult(HeavyRain);
      else if (currentWeather === "Light Cloud") setweatherResult(LightCloud);
      else if (currentWeather === "Light Rain") setweatherResult(LightRain);
      else if (currentWeather === "Showers") setweatherResult(Shower);
      else if (currentWeather === "Sleet") setweatherResult(Sleet);
      else if (currentWeather === "Snow") setweatherResult(Snow);
      else if (currentWeather === "Thunderstorm")setweatherResult(Thunderstorm);
    });
  }, [props,currentWeather]);
  return (
    <div>
      <div><img src={weatherResult}/></div>
      <div>{temp} <span>&#8451;</span></div>
      <div>{currentWeather}</div>
      <div><DateConverter value={time}/></div>
      <div>{locationCtx.location}</div>
    </div>
  );
}
