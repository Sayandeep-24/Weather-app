import React, { useContext, useState, useEffect } from "react";
import { LocationContext } from "../../Store/location-context";
import { TemperatureContext } from "../../Store/temperature-context";
import BounceLoader from "react-spinners/BounceLoader";

import axios from "axios";
import DateConverter from "./DateConverter";

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

export default function WeatherForecast() {
  const [temp, setTemp] = useState(0);
  const [Ftemp, setFtemp] = useState(0);
  const [weatherResult, setweatherResult] = useState(null);
  const [currentWeather, setcurrentWeather] = useState(null);
  const [time, setTime] = useState();
  const [location, setLocation] = useState();
  const locationCtx = useContext(LocationContext);
  const temperatureCtx = useContext(TemperatureContext);
  const [loading,setLoading] = useState(false);

  let loc_url = null;
  const proxyCORS = "https://lit-anchorage-03290.herokuapp.com/";
  let loc_search_url =
    proxyCORS +
    "https://www.metaweather.com/api/location/search/?query=" +
    locationCtx.location;

  function cToF(celsius) 
    {
      let cTemp = celsius;
      let cToFahr = ((cTemp * 9) / 5)+ 32;
      return (Math.round(cToFahr));
    }
  

  useEffect(() => {
    setLoading(true);
    axios
      .get(loc_search_url)
      .then((response) => {
        loc_url =
          proxyCORS +
          "https://www.metaweather.com/api/location/" +
          response.data[0].woeid;
        return axios.get(loc_url);
      })
      .then((response) => {
        setcurrentWeather(
          response.data.consolidated_weather[0].weather_state_name
        );
        setTemp(Math.round(response.data.consolidated_weather[0].the_temp));
        setTime(response.data.time);
        setLoading(false);
        if (currentWeather === "Clear") setweatherResult(clear);
        else if (currentWeather === "Hail") setweatherResult(Hail);
        else if (currentWeather === "Heavy Cloud") setweatherResult(HeavyCloud);
        else if (currentWeather === "Heavy Rain") setweatherResult(HeavyRain);
        else if (currentWeather === "Light Cloud") setweatherResult(LightCloud);
        else if (currentWeather === "Light Rain") setweatherResult(LightRain);
        else if (currentWeather === "Showers") setweatherResult(Shower);
        else if (currentWeather === "Sleet") setweatherResult(Sleet);
        else if (currentWeather === "Snow") setweatherResult(Snow);
        else if (currentWeather === "Thunderstorm") setweatherResult(Thunderstorm);
        setLocation(response.data.title);

      });
      setFtemp(cToF(temp));

  }, [locationCtx.location, temperatureCtx]);


  return (
    <div>
      {loading?<BounceLoader color={'#A9A9A9'} loading={loading}  size={20} />  :
      <div>
        <div>
          <img src={weatherResult} />
        </div>
        {temperatureCtx.isCelcius?<div> {temp} <span>&#8451;</span> </div>: <div>{Ftemp} <span>&#8457;</span></div> }
        <div>{currentWeather}</div>
        <div>
        Today &emsp;.&emsp;   <DateConverter value={time} />
        </div>
        <div>{location}</div>
      </div>}
      
    </div>
  );
}
