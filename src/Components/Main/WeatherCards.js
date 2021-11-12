import React, { useContext, useState, useEffect } from "react";
import { LocationContext } from "../../Store/location-context";
import axios from "axios";
import Card from "./Card";


export default function WeatherCards()
{
    const locationCtx = useContext(LocationContext);
    const proxyCORS = "https://lit-anchorage-03290.herokuapp.com/";
    let loc_search_url =proxyCORS + "https://www.metaweather.com/api/location/search/?query=" +locationCtx.location;
    let loc_url= null;
    let num=1;
    const [currentWeather, setcurrentWeather] = useState(null); 
    
    useEffect(()=> {
      axios.get(loc_search_url).then((response) => {
        loc_url=proxyCORS + "https://www.metaweather.com/api/location/" + response.data[0].woeid;
        return axios.get(loc_url);
        })
        .then((response) => {
            setcurrentWeather(response.data);    
          });
    },[locationCtx.location, currentWeather]);
    
    return( 
    <div>
        <Card id={num} data={currentWeather}/>
        <Card id={num+1} data={currentWeather}/>
        <Card id={num+2} data={currentWeather}/>
        <Card id={num+3} data={currentWeather}/>
        <Card id={num+4} data={currentWeather}/>
    </div>)
}


  
