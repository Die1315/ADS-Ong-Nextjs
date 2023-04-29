import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar/navbar";
import Loading from "../components/Loading/loading";
import OngList from "../components/ong-list/OngList";
import MapView from "../components/map-box/map";

function OngFind() {
  //TODO TEST ONLY, THIS IS NOT USED IN THIS LIST VIEW
  // const [userLngLat, setUserLngLat] = useState(null);

  // data from DB, ong list
  const [ongList, setOngList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOngList = async () => {
    const response = await axios
      .get("/api/ongs", {})
      .then((response) => response.data);
    setOngList(response);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    fetchOngList();
  }, []);

  // data from DB, post list
  const [postList, setPostList] = useState(null);
  const fetchPostList = async () => {
    const response = await axios
      .get("/api/postsall", {})
      .then((response) => response.data);

    setPostList(response);
  };
  useEffect(() => {
    fetchPostList();
  }, []);

  return (<>
    {isLoading ? (
      <Loading />
    ) : (
      <div>
        <Navbar />
        <div className="container mx-auto p-5 flex flex-col-reverse md:flex-row items-center md:items-stretch gap-5">
          <div className="w-full md:w-6/12 flex flex-col gap-5">
            <OngList data={ongList} />
          </div>
          <div className="w-full md:w-6/12 flex flex-col gap-5 pt-0 md:pt-20">
            <MapView data={postList} />
          </div>
        </div>
      </div>
    )}
  </>
  );
}

export default OngFind;
