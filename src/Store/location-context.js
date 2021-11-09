import React, {useState} from "react";

export const LocationContext = React.createContext(
    {location: null,
    setLocation: (loc)=>{}}
);

//We take this in the provider 
//component, but when we change the values, why does the initial context not change,
// but the "context" inside the "locationContextProvider" function changes?

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

