import React, { useContext } from "react";
import {useRef} from "react";

import { LocationContext } from "../../Store/location-context";


export default function LocationForm() {
  const locationCtx = useContext(LocationContext);

  const locationRef = useRef();

  let entered_location = null;

  function modifyLocation() {
    locationCtx.setLocation(entered_location);
  }

  function submitHandler(event) {
    event.preventDefault();
    entered_location = locationRef.current.value;
    modifyLocation();
  }

  return (
    <div>
      <section>
        <form onSubmit={submitHandler}>
          <label>
            Location
            <input type="text" name="location" ref={locationRef} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </section>
    </div>
  );
}
