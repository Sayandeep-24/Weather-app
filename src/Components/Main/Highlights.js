import React, { useEffect, useState, useContext } from "react";
import { LocationContext } from "../../Store/location-context";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";


export default function Highlights() {
  const locationCtx = useContext(LocationContext);
  const proxyCORS = "https://www.whateverorigin.org/get?url=";
  let loc_search_url =
    proxyCORS +
    encodeURIComponent("https://www.metaweather.com/api/location/search/?query=")+
    locationCtx.location;
  let loc_url = null;
  const [currentWeather, setcurrentWeather] = useState(null);
  const [windStatus, setwindStatus] = useState();
  const [windDirection, setwindDirection] = useState();
  const [Humidity, setHumidity] = useState(0);
  const [Visibility, setVisibility] = useState();
  const [AirPressure, setAirPressure] = useState();

  const [loading, isLoading] = useState(false);

  useEffect(() => {
    isLoading(true);
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
        setcurrentWeather(response.data);
        setwindStatus(
          Math.round(response.data.consolidated_weather[0].wind_speed)
        );
        setwindDirection(
          response.data.consolidated_weather[0].wind_direction_compass
        );
        setHumidity(Math.round(response.data.consolidated_weather[0].humidity));
        setVisibility(
          Math.round(response.data.consolidated_weather[0].visibility)
        );
        setAirPressure(response.data.consolidated_weather[0].air_pressure);
        isLoading(false);
      });
  }, [locationCtx.location]);

  return (
    <div>
      {loading ? (
        <div className='main-loading'><PulseLoader color={'#A9A9A9'} loading={loading}  size={10} /></div>
      ) : (
        <div>
          <h4>Today's Highlights </h4>
          <div className="weather-highlights">
            <div className="highlights-wrap">
              <div className="highlights">
                <p>Wind Status</p>
                <p className='highlight-value'> {windStatus} <span className='highlight-unit'>mph</span></p>
                <p>{windDirection}</p>
              </div>
            </div>
            <div className="highlights-wrap">
              <div className="highlights">
                <p>Humidity</p>
               <p className='highlight-value'>{Humidity} <span className='highlight-unit'>%</span></p> 
                <div>
                  <div className='legend'><p>0</p> <p>50</p><p>100</p></div>
                  <progress value={Math.round(Humidity)} max={100}></progress>
                  <div className='legend-perc'><p>%</p></div>
                </div>
              </div>
            </div>
            <div className="highlights-wrap">
              <div className="highlights">
                <p>Visibility</p>
               <p className='highlight-value'>{Visibility} <span className='highlight-unit'>miles</span></p> 
              </div>
            </div>
            <div className="highlights-wrap">
              <div className="highlights">
                <p>Air Pressure</p>
                <p className='highlight-value'>{AirPressure} <span className='highlight-unit'> mb</span></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
