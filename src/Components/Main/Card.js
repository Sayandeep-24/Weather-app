import React, { useEffect, useState } from "react";
import DateConverter from "../Sidebar/DateConverter";

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

export default function Card(props)
{
    const [maxTemp, setmaxTemp] = useState();
    const [minTemp, setminTemp] = useState();
    const [date, setDate] = useState();
    const [weatherResult,setweatherResult] = useState();
    const [currentWeather, setcurrentWeather] = useState();

    useEffect(()=> {
        if(props.data)
        {
            setDate(props.data.consolidated_weather[props.id].applicable_date);
            setmaxTemp(Math.round(props.data.consolidated_weather[props.id].max_temp));
            setminTemp(Math.round(props.data.consolidated_weather[props.id].min_temp));
            setcurrentWeather(props.data.consolidated_weather[props.id].weather_state_name);
    
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
            
        }
    },[props, currentWeather]);

    return(
    <div> 
       {props.id===1?<div>Tommorow</div> : <DateConverter value={date} />} 
        <div><img src={weatherResult} /></div>
        <div>{maxTemp}<span>&#8451;&emsp;</span>{minTemp}<span>&#8451;</span></div>
    </div>);
}