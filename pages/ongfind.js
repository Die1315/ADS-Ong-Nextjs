import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar/navbar";
import Loading from "../components/Loading/loading";
import MapView from "../components/map-box/map";
import { getGLobalPosts, getNearPost } from "../service/data-service";

function OngFind() {
  // data from DB, ong list
  const [isLoading, setIsLoading] = useState(true);
  const [postList, setPostList] = useState(null);
  const [userLngLat, setUserLngLat] = useState(null);
  const [distance, setDistance] = useState(1000)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);



  useEffect(() => {
    // getGLobalPosts().then((response) => {
    //   setPostList(response);
    // })
    if (userLngLat) {
      getNearPost(userLngLat, distance).then((posts) => {
        setPostList(posts)
      })
    }

  }, [userLngLat]);
  const setLngLat = (lngLat) => {
    setUserLngLat(lngLat);
  }
  const handleChange = (event) => {
    setDistance(event.target.value);
  }
  return (<>
    {isLoading ? (
      <Loading />
    ) : (
      <div>
        <Navbar />
        <div className="container mx-auto max-h-50 min-h-90 md:max-h-90 p-5 flex flex-col-reverse md:flex-row items-center md:items-stretch gap-5">
          <div className="w-full flex flex-col gap-3">
            <h3 className="self-center underline">Haz click sobre la zona que deseas explorar</h3>
            <div className="flex justify-center items-center gap-3">

              <label className="font-bold">Distancia en kms: </label>
              <input
                className="w-24 text-center bg-white rounded full py-2 px-4 text-dark focus:outline-none"
                onChange={handleChange}
                name="Distance"
                type="number"
                placeholder="Distancia en Km"
                value={distance}
              />
            </div>
            <MapView data={postList} setLngLat={setLngLat} />
          </div>
        </div>
      </div>
    )}
  </>
  );
}

export default OngFind;
