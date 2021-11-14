import React, { useEffect, useState, useContext } from "react";
import { LocationContext } from "../../Store/location-context";
import axios from "axios";
import ProgressBar from "./Progress"

export default function Highlights()
{
    const locationCtx = useContext(LocationContext);
    const proxyCORS = "https://lit-anchorage-03290.herokuapp.com/";
    let loc_search_url =proxyCORS + "https://www.metaweather.com/api/location/search/?query=" +locationCtx.location;
    let loc_url= null;
    const [currentWeather, setcurrentWeather] = useState(null); 
    const [windStatus, setwindStatus] = useState();
    const [windDirection, setwindDirection] = useState();
    const [Humidity, setHumidity] = useState();
    const [Visibility, setVisibility] = useState();
    const [AirPressure, setAirPressure] = useState();



    useEffect(()=> {
      axios.get(loc_search_url).then((response) => {
        loc_url=proxyCORS + "https://www.metaweather.com/api/location/" + response.data[0].woeid;
        return axios.get(loc_url);
        })
        .then((response) => {
            setcurrentWeather(response.data);    
            setwindStatus(Math.round(response.data.consolidated_weather[0].wind_speed));
            setwindDirection(response.data.consolidated_weather[0].wind_direction_compass);
            setHumidity(response.data.consolidated_weather[0].humidity);
            setVisibility(Math.round(response.data.consolidated_weather[0].visibility));
            setAirPressure(response.data.consolidated_weather[0].air_pressure);
          });
    },[locationCtx.location, currentWeather]);
    


    return (
    <div>
        <h2>Today's Highlights </h2>
        <div>
            <p>Wind Status</p>
            <p> {windStatus} mph</p>
            <p>{windDirection}</p>
        </div>
        <div>
            <p>Humidity</p>
            {Humidity} %

            <div>
                <div>0 50 100</div>
                <div><ProgressBar value={Humidity} max={100} /></div>
                <div>%</div>
            </div>
        </div>
        <div>
            <p>Visibility</p>
            {Visibility} miles 
        </div>
        <div>
            <p>Air Pressure</p>
            {AirPressure} mb
        </div>
        

    </div>
    );
}

