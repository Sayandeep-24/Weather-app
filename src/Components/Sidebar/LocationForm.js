import React, { useContext, useState } from "react";
import {useRef} from "react";
import * as AiIcons from 'react-icons/ai';
import SearchResults from "./SearchResults";
import { LocationContext } from "../../Store/location-context";
import {AiOutlineSearch} from "react-icons/ai";


export default function LocationForm(props) {
  const locationCtx = useContext(LocationContext);
  const [location, setLocation] = useState(null);
  const locationRef = useRef();

  let entered_location = null;

  function changeLocation(loc)
  {
    setLocation(loc);
  }

  function submitHandler(event) {
    event.preventDefault();
    entered_location = locationRef.current.value;
    locationRef.current.value='';
    changeLocation(entered_location);
    }


  return (
    <div className='side-menu'>
      <section className='search-results'>
        <span onClick={props.value} className='closing-button'><AiIcons.AiOutlineClose /></span>
        <form onSubmit={submitHandler} className='search-form'>
          <div className='search-bar'>
          <label className='input-form'>
            <AiOutlineSearch className='search-icon' />
            <input type="text" name="location" ref={locationRef} placeholder="search location" className='search-input'/>
          </label>
          </div>
          <div ><input type="submit" value="Search" className='form-search-button'/></div>
        </form>
        {location? <SearchResults changeBarState={props.value} location={location} changeLocation={changeLocation}/> : <span>No results</span>}
      </section>
    </div>
  );
}


