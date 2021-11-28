import React, { useContext } from "react";
import WeatherCards from "./WeatherCards";
import Highlights from "./Highlights";
import ErrorMessageMain from "./ErrorMessageMain";
import { LocationContext } from "../../Store/location-context";

export default function Main() {
  const locationCtx = useContext(LocationContext);
  let currentLocation = locationCtx.location;
  return (
    <div className="main">
      <div>{currentLocation.length < 1 && <ErrorMessageMain />}</div>
      <div>
        <div>{currentLocation.length > 0 && <WeatherCards />}</div>
        <div>{currentLocation.length > 0 && <Highlights />}</div>
      </div>
    </div>
  );
}
