import React, { useContext, useState, useEffect } from "react";
import { LocationContext } from "../../Store/location-context";
import axios from "axios";
import Card from "./Card";
import UnitChange  from "./UnitChange";



export default function WeatherCards()
{
    const locationCtx = useContext(LocationContext);
    const proxyCORS = "https://www.whateverorigin.org/get?url=";
    let loc_search_url =proxyCORS + "https://www.metaweather.com/api/location/search/?query=" +locationCtx.location;
    let loc_url= null;
    let num=1;
    const [currentWeather, setcurrentWeather] = useState(null); 
    const [loading, setLoading] = useState(false);
    useEffect(()=> {
      setLoading(true);
      axios.get(loc_search_url).then((response) => {
        loc_url=proxyCORS + "https://www.metaweather.com/api/location/" + response.data[0].woeid;
        return axios.get(loc_url);
        })
        .then((response) => {
            setcurrentWeather(response.data);    
            setLoading(false);
          });
    },[locationCtx.location]);
    
    return( 
    <div>
        {
        loading?<span />  :      
        <div>
          <UnitChange />
          <div className='weather-forecast'>
            <Card id={num} data={currentWeather} />
            <Card id={num+1} data={currentWeather} />
            <Card id={num+2} data={currentWeather}/>
            <Card id={num+3} data={currentWeather}/>
            <Card id={num+4} data={currentWeather}/>
          </div>

       </div>
      }
      
    </div>)
}


  
/*  */ 