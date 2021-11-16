import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LocationContext } from "../../Store/location-context";

function SearchResults(props) {
  const proxyCORS = "https://lit-anchorage-03290.herokuapp.com/";
  let url =
    proxyCORS +
    "https://www.metaweather.com/api/location/search/?query=" +
    props.location;
  const [List, setList] = useState([]);
  const locationCtx = useContext(LocationContext);

  useEffect(() => {
    if (props.location) {
      axios
        .get(url)
        .then((response) => {
          if(response.data.length>0)
          {
            setList((prevList) => {
                return prevList.concat([
                  {
                    key: response.data[0].woeid,
                    place: response.data[0].title,
                  },
                ]);
              });
          }
          else
          {
            props.changeLocation(null);
          }
        })
        .catch((err) => {
          console.log("Error in API call : ", err);
        });
    }
  }, [props.location]);

  function selectLocationHandler(place) {
    props.changeBarState();
    locationCtx.setLocation(place);
  }

  return (
    <div>
      <ul>
        {List.map((loc) => {
          return (
            <li key={loc.key} onClick={() => selectLocationHandler(loc.place)}>
              {loc.place}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchResults;
