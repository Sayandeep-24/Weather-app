import React, { useContext, useState } from "react";
import {useRef} from "react";
import * as AiIcons from 'react-icons/ai';
import SearchResults from "./SearchResults";
import { LocationContext } from "../../Store/location-context";


export default function LocationForm(props) {
  const locationCtx = useContext(LocationContext);
  const [location, setLocation] = useState(null);
  const locationRef = useRef();

  let entered_location = null;

  function modifyLocation() {
    locationCtx.setLocation(entered_location);
  }

  function submitHandler(event) {
    event.preventDefault();
    entered_location = locationRef.current.value;
    locationRef.current.value='';
    setLocation(entered_location);
  }


  return (
    <div>
      <section>
        <span onClick={props.value}><AiIcons.AiOutlineClose /></span>
        <form onSubmit={submitHandler}>
          <label>
            Location
            <input type="text" name="location" ref={locationRef} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {location? <SearchResults changeBarState={props.value} location={location}/> : <span>No results</span>}
      </section>
    </div>
  );
}
