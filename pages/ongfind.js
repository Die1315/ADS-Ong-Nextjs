import OngList from "../components/ong-list/OngList";
import MapView from "../components/map-box/map";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/navbar";

function OngFind() {
  //TODO TEST ONLY, THIS IS NOT USED IN THIS LIST VIEW
  // const [userLngLat, setUserLngLat] = useState(null);

  // data from DB, ong list
  const [ongList, setOngList] = useState([]);

  const fetchOngList = async () => {
    const response = await axios
      .get("/api/ongs", {})
      .then((response) => response.data);
    setOngList(response);
  };

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

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-5 flex gap-5">
        <div className="w-6/12 flex flex-col gap-5">
          <OngList data={ongList} />
        </div>
        <div className="w-6/12 flex flex-col gap-5">
          <MapView data={postList}/>
        </div>
      </div>
    </div>
  );
}

export default OngFind;
