import React, { useContext } from "react";
import WeatherForecast  from "./WeatherForecast";
import ErrorMessageSidebar  from "./ErrorMessageSidebar";
import DefaultLocation  from "./DefaultLocation";
import { LocationContext } from "../../Store/location-context";
import SearchButton  from "./SearchButton";



export default function Sidebar() {
    const locationCtx = useContext(LocationContext);
    let currentLocation = locationCtx.location;
    return (
        <div className="sidebar">
        <DefaultLocation />    
        <SearchButton />
        <div>{currentLocation.length<1 && <ErrorMessageSidebar />}</div>        
        <div>{currentLocation.length>0 && <WeatherForecast />}</div>        
        </div>
    );
}



