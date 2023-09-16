import React, { useState, useContext } from "react";
import axios from "axios";
import { LocationContext } from "../../Store/location-context";
import { BiCurrentLocation } from 'react-icons/bi';


export default function DefaultLocation()
{  
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [url, setUrl] = useState();
    const locationCtx = useContext(LocationContext);

    const proxyCORS = "https://www.whateverorigin.org/get?url=";
    let loc_search_url =proxyCORS + "https://www.metaweather.com/api/location/search/?lattlong=";

    const[count,setCount] = useState(0);

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
          console.log("error");
        });
      }
    }

    const setLoc = () => {
        
        if(url){
            axios.get(url).then((response) => 
            {
              locationCtx.setLocation(response.data[0].title);
              setCount(count+1);
            }).catch((err) =>{
                console.log("Some probs");
            })      
        }
        else{
          console.log("error");
        }
    }



    return(<span>
            {getLocation()}
            {count===0?setLoc():<span />}
            <button onClick={setLoc} className='location-button'><BiCurrentLocation className='location-logo'/></button>
         </span> )
}

