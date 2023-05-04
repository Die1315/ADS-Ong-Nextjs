import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar/navbar";
import Loading from "../components/Loading/loading";
import OngList from "../components/ong-list/OngList";
import MapView from "../components/map-box/map";
import { getGLobalPosts } from "../service/data-service";

function OngFind() {
  //TODO TEST ONLY, THIS IS NOT USED IN THIS LIST VIEW
  // const [userLngLat, setUserLngLat] = useState(null);

  // data from DB, ong list
  const [ongList, setOngList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);


  // data from DB, post list
  const [postList, setPostList] = useState(null);

  useEffect(() => {
    getGLobalPosts().then((response) => {
      setPostList(response);
    })

  }, [
    
  ]);

  return (<>
    {isLoading ? (
      <Loading />
    ) : (
      <div>
        <Navbar />
        <div className="container mx-auto h-[calc(100vh-65px)] p-5 flex flex-col-reverse md:flex-row items-center md:items-stretch gap-5">
          <div className="w-full pt-8">
            <MapView data={postList} />
          </div>
        </div>
      </div>
    )}
  </>
  );
}

export default OngFind;
