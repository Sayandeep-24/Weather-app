import React, { useState } from "react";
import axios from "axios";

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
  let currentWeather = null;
  const [temp,setTemp] = useState(0);
  const [weatherResult, setweatherResult] = useState(null);
  axios.get(props.value).then((response) => {
    currentWeather = response.data.consolidated_weather[0].weather_state_name;
    setTemp(Math.round(response.data.consolidated_weather[0].the_temp));
    if (currentWeather === "Clear") setweatherResult(clear);
    else if (currentWeather === "Hail") setweatherResult(Hail);
    else if (currentWeather === "Heavy Cloud") setweatherResult(HeavyCloud);
    else if (currentWeather === "Heavy Rain") setweatherResult(HeavyRain);
    else if (currentWeather === "Light Cloud") setweatherResult(LightCloud);
    else if (currentWeather === "Light Rain") setweatherResult(LightRain);
    else if (currentWeather === "Shower") setweatherResult(Shower);
    else if (currentWeather === "Sleet") setweatherResult(Sleet);
    else if (currentWeather === "Snow") setweatherResult(Snow);
    else if (currentWeather === "Thunderstorm") setweatherResult(Thunderstorm);
  });

  return (
    <div>
      <img src={weatherResult} />
      {temp}
      {currentWeather}
    </div>
  );
}
