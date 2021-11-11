import React, { useContext, useState, useEffect } from "react";
import { LocationContext } from "../../Store/location-context";
import axios from "axios";
import WeatherDetails from "./WeatherDetails";

export default function WeatherForecast() {
  const locationCtx = useContext(LocationContext);
  const proxyCORS = "https://lit-anchorage-03290.herokuapp.com/";
  let loc_id;
  let loc_search_url =
    proxyCORS +
    "https://www.metaweather.com/api/location/search/?query=" +
    locationCtx.location;

  const [loc_url, setUrl] = useState(null);

  useEffect(()=> {
    axios.get(loc_search_url).then((response) => {
        loc_id = response.data[0].woeid;
        setUrl(proxyCORS + "https://www.metaweather.com/api/location/" + loc_id);
      });    
  },[locationCtx.location]);


  return (
    <div>
      <div>{loc_url != null && <WeatherDetails value={loc_url} />}</div>
    </div>
  );
}
