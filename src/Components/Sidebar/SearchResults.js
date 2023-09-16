import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LocationContext } from "../../Store/location-context";
import BounceLoader from "react-spinners/BounceLoader";


function SearchResults(props) {
  const proxyCORS = "http://www.whateverorigin.org/get?url=";
  let url =
    proxyCORS +
    "https://www.metaweather.com/api/location/search/?query=" +
    props.location;
  const [List, setList] = useState([]);
  const locationCtx = useContext(LocationContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (props.location) {
      axios
        .get(url)
        .then((response) => {
          if (response.data.length > 0) {
            setList((prevList) => {
              return prevList.concat([
                {
                  key: response.data[0].woeid,
                  place: response.data[0].title,
                },
              ]);
            });
          } else {
            props.changeLocation(null);
          }
          setLoading(false);
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
        {loading ? (
          <div className="sidebar-loading-search">
            <BounceLoader color={"#A9A9A9"} loading={loading} size={30} />
          </div>
      )
        :
     (<div className="search-results-box">
        <ul>
          {List.slice(0).reverse().map((loc) => {
            return (
              <li
                className="search-results-locations"
                key={loc.key}
                onClick={() => selectLocationHandler(loc.place)}
              >
                {loc.place}
              </li>
            );
          })}
        </ul>
      </div>)}
    </div>
  );
}

export default SearchResults;
