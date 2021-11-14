import React, {useState} from "react";

export const LocationContext = React.createContext(
    {
    location: null,
    setLocation: (loc)=>{}}
);

export function LocationContextProvider(props)
{
    const [currentLocation, setCurrentLocation] = useState([]);

    function changeLocation(newLocation)
    {
        setCurrentLocation(newLocation);
    }

    const context={
    location : currentLocation,
    setLocation : changeLocation
    };

    return <LocationContext.Provider value={context}> {props.children} </LocationContext.Provider>
}

