import React, { useContext } from "react";
import { TemperatureContext } from "../../Store/temperature-context";


export default function UnitChange()
{
    const temperatureCtx = useContext(TemperatureContext);

    function changeUnitC(current)
    {
        if(current!=true)
        {
            temperatureCtx.setIsCelcius();
        }
    }
    function changeUnitF(current)
    {
        if(current!=false)
        {
            temperatureCtx.setIsCelcius();
        }
    }

    return( 
    <div>
        <button onClick={() => changeUnitC(temperatureCtx.isCelcius)}>&#8451;</button>
        <button onClick={() => changeUnitF(temperatureCtx.isCelcius)}>&#8457;</button>
    </div>)
}


  
