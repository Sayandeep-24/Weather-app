import React, { useState } from 'react';
import LocationForm  from "./LocationForm";


function SearchButton() {
    const [slidebar, setSlidebar] = useState(false);
    const showSlidebar = () =>{
        setSlidebar(!slidebar);
    } 
  

    return (
        <div>
            <button className='Search-button' onClick={showSlidebar}>Search for places</button>
            <nav className={slidebar ? 'slide-menu active' : 'slide-menu'}>
                <LocationForm value={showSlidebar}/>
            </nav>

        </div>
    )
}

export default SearchButton
