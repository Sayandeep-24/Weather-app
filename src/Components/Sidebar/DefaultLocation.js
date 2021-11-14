import React, { useState, useContext } from "react";
import axios from "axios";
import { LocationContext } from "../../Store/location-context";


export default function DefaultLocation()
{  
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [url, setUrl] = useState();
    const locationCtx = useContext(LocationContext);

    const proxyCORS = "https://lit-anchorage-03290.herokuapp.com/";
    let loc_search_url =proxyCORS + "https://www.metaweather.com/api/location/search/?lattlong=";



    const getLocation = () => 
    {
      if (navigator.geolocation) 
      {
        navigator.geolocation.getCurrentPosition((position) => 
        {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          if(lat && lng)
          {
            setUrl(loc_search_url + lat +","+lng);
          }
        }, () => 
        {
          console.log('Unable to retrieve your location');
        });
      }
    }

    const setLocation = () => {
        if(url){
            axios.get(url).then((response) => 
            {
              locationCtx.setLocation(response.data[0].title);
            }).catch((err) =>{
                console.log("Some probs");
            })      
        }
    }



    return(<span>
            {getLocation()}
            {setLocation()}
            <button onClick={setLocation}>Get Location</button>
         </span> )
}