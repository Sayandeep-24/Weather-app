import React, { useContext, useState, useEffect } from "react";
import { LocationContext } from "../../Store/location-context";
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


export default function WeatherCards()
{
    const locationCtx = useContext(LocationContext);
    const proxyCORS = "https://lit-anchorage-03290.herokuapp.com/";
    let loc_search_url =proxyCORS + "https://www.metaweather.com/api/location/search/?query=" +locationCtx.location;
  
  
    const [weatherResult, setweatherResult] = useState(null);
    const [currentWeather, setcurrentWeather] = useState(null); 
    const [time, setTime] = useState();
    
    let loc_url= null;
  
    useEffect(()=> {
      axios.get(loc_search_url).then((response) => {
        loc_url=proxyCORS + "https://www.metaweather.com/api/location/" + response.data[0].woeid;
        return axios.get(loc_url);
        })
        .then((response) => {
            console.log(response);
            setcurrentWeather(response.data.consolidated_weather[0].weather_state_name);
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
    },[locationCtx.location, currentWeather]);
  

    return( 
    <div>

    </div>)
}


  
