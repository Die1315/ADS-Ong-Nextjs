import OngList from "../components/ong-list/OngList";
import MapView from "../components/map-box/map";

function OngFind() {
  return (
    <div>
      <div className="float-left">
        <OngList />
      </div>
      <div className="float-right">
        <MapView />
      </div>
    </div>
  );
}

export default OngFind;
