import { useEffect, useRef, useState } from "react";
import Image from "next/image";
// import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, Popup, NavigationControl, ScaleControl } from "react-map-gl";

const data = [
  {
    id: 1,
    name: "Somewhere in Morocco",
    description: "Sahara Desert",
    coordinates: { lat: 32.2380665, lon: -3.7284298 },
  },
  {
    id: 2,
    name: "Somewhere in Morocco Two",
    description: "Sahara Desert",
    coordinates: { lat: 33.2380665, lon: -3.7284298 },
  },
  {
    id: 3,
    name: "Somewhere in Morocco 3",
    description: "Sahara Desert",
    coordinates: { lat: 32.2380665, lon: -4.7284298 },
  },
];

// ref: https://www.youtube.com/watch?v=JJatzkPcmoI
// ref: https://stackoverflow.com/questions/71348403/mapbox-popup-only-opens-once-and-never-again
function MapView() {
  const [viewState, setViewState] = useState({
    latitude: 16.754205,
    longitude: 14.018788,
    zoom: 3,
  });

  const [selectedProject, setSelectedPoject] = useState(null);

  useEffect(() => {
    const listener = e => {
      if(e.key === "Escape"){
        setSelectedPoject(null);
      }
    }
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    }
  }, []);

  return (
    <div>
      <Map
        {...viewState}
        style={{ height: "600px", width: "800px" }}
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <NavigationControl position="top-right"/>
        <ScaleControl position="bottom-left" />
        {data.map((project) => (
          <Marker
            key={project.id}
            latitude={project.coordinates.lat}
            longitude={project.coordinates.lon}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                setSelectedPoject(project);
                console.log(`::: ${project.name}`);
              }}
            >
              <Image src="well.svg" alt="Well" width={30} height={30} />
            </button>
          </Marker>
        ))}

        {selectedProject && (
          <Popup
            closeOnClick={false}
            latitude={selectedProject.coordinates.lat}
            longitude={selectedProject.coordinates.lon}
            onClose={() => {
              setSelectedPoject(null);
            }}
          >
            <div>
              <h1>{selectedProject.name}</h1>
              <p>{selectedProject.description}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default MapView;
