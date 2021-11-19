import React, { useContext, useState } from "react";
import { TemperatureContext } from "../../Store/temperature-context";


export default function UnitChange()
{
    const temperatureCtx = useContext(TemperatureContext);
    const [selectedBtn, setSelectedBtn] = useState(true);
    function changeUnitC(current)
    {
        setSelectedBtn(true);
        console.log(selectedBtn);
        if(current!=true)
        {
            temperatureCtx.setIsCelcius();
        }
    }
    function changeUnitF(current)
    {
        setSelectedBtn(false);
        console.log(selectedBtn);
        if(current!=false)
        {
            temperatureCtx.setIsCelcius();
        }
    }

    return( 
    <div className='cel-fah'>
        <button onClick={() => changeUnitC(temperatureCtx.isCelcius)} className ={selectedBtn?'deg-active':'cel-btn'} >&#8451;</button>
         &emsp;
        <button onClick={() => changeUnitF(temperatureCtx.isCelcius)} className ={selectedBtn?'fah-btn':'deg-active'} >&#8457;</button>
    </div>)
}


