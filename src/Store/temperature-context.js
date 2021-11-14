import React, {useState} from "react";

export const TemperatureContext = React.createContext(
    {
    isCelcius: true,
    setIsCelcius: ()=>{}}
);

export function TemperatureContextProvider(props)
{
    const [currentUnit, setCurrentUnit] = useState(true);

    function changeUnit()
    {
        setCurrentUnit(!currentUnit);
    }

    const context={
    isCelcius : currentUnit,
    setIsCelcius : changeUnit
    };

    return <TemperatureContext.Provider value={context}> {props.children} </TemperatureContext.Provider>
}
