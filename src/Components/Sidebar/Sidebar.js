import React, { useContext } from "react";
import LocationForm  from "./LocationForm";
import WeatherForecast  from "./WeatherForecast";
import ErrorMessageSidebar  from "./ErrorMessageSidebar";
import { LocationContext } from "../../Store/location-context";


export default function Sidebar() {
    const locationCtx = useContext(LocationContext);
    let currentLocation = locationCtx.location;
    return (
        <div className="sidebar">
        <LocationForm />
        <div>{currentLocation.length<1 && <ErrorMessageSidebar />}</div>        
        <div>{currentLocation.length>0 && <WeatherForecast />}</div>        
        </div>
    );
}
