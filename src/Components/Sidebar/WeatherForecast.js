import React, { useContext, useState, useEffect } from "react";
import { LocationContext } from "../../Store/location-context";
import { TemperatureContext } from "../../Store/temperature-context";
import BounceLoader from "react-spinners/BounceLoader";
import { MdLocationOn } from "react-icons/md";
import {BsCloudSlashFill} from "react-icons/bs";


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
  const [Weather, setWeather] = useState(null);
  const [time, setTime] = useState();
  const [location, setLocation] = useState();
  const locationCtx = useContext(LocationContext);
  const temperatureCtx = useContext(TemperatureContext);
  const [loading, setLoading] = useState(false);
  let currentWeather = null;

  let loc_url = null;
  const proxyCORS = "https://www.whateverorigin.org/get?url=";
  let loc_search_url =
    proxyCORS +
    "https://www.metaweather.com/api/location/search/?query=" +
    locationCtx.location;

  function cToF(celsius) {
    let cTemp = celsius;
    let cToFahr = (cTemp * 9) / 5 + 32;
    return Math.round(cToFahr);
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
        setWeather(response.data.consolidated_weather[0].weather_state_name);
        currentWeather =
          response.data.consolidated_weather[0].weather_state_name;
        setTemp(Math.round(response.data.consolidated_weather[0].the_temp));
        setTime(response.data.time);
        setLoading(false);
        setLocation(response.data.title);
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
      });
    setFtemp(cToF(temp));
  }, [locationCtx.location, temp]);

  return (
    <div>
      {loading ? (
        <div>
          <div className="no-weather">
            <BsCloudSlashFill className="no-weather-icon" />
          </div>

          <div className="sidebar-loading">
            <BounceLoader color={"#A9A9A9"} loading={loading} size={30} />
          </div>
        </div>
      ) : (
        <div>
          <div className="sidebar-weather">
            <img src={weatherResult} />
          </div>
          {temperatureCtx.isCelcius ? (
            <div className="sidebar-temperature-block">
              <span className="sidebar-temperature"> {temp} </span>
              <span className="sidebar-degree">&#8451;</span>{" "}
            </div>
          ) : (
            <div className="sidebar-temperature-block">
              <span className="sidebar-temperature">{Ftemp}</span>{" "}
              <span className="sidebar-degree">&#8457;</span>
            </div>
          )}
          <div className="sidebar-weather-forecast">
            <h3 className="weather">{Weather}</h3>
          </div>
          <div className="sidebar-date">
            Today &emsp;<h3 className="dot">•</h3> &emsp;{" "}
            <DateConverter value={time} />
          </div>
          <div className="sidebar-location">
            <MdLocationOn className="pin" />
            {location}
          </div>
        </div>
      )}
    </div>
  );
}
