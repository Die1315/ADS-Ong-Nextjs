import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import OngList from "../../components/ong-list/OngList";
import MapView from "../../components/map-box/map";

function OngFind() {
  return (
  <div>
    <OngList />
    <MapView />
  </div>
  )
}

export default OngFind;