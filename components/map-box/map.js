import { useEffect, useState } from "react";
import Image from "next/image";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import configData from "./map.config.json";

function MapView({ data, setLngLat, initialViewState }) {
  // map viewstate
  const [viewState, setViewState] = useState(
    initialViewState || {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    }
  );

  const [selectedLngLat, setSelectedLngLat] = useState(null);

  // map selected post popup
  const [selectedPost, setSelectedPost] = useState(null);
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPost(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  // map of project type to load proper image
  function markerImgSrc(projectType) {
    if (projectType && configData) {
      const imgMap = configData["marker-images-map"];
      return imgMap[projectType];
    } else return "charity.svg";
  }

  return (
    <Map
      {...viewState}
      // style={{width: "100%"}}
      // trackResize={true}
      // projection="globe"
      renderWorldCopies={false}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      onMove={(evt) => setViewState(evt.viewState)}
      onClick={(e) => {
        setLngLat && setLngLat(e.lngLat);
        setSelectedLngLat(e.lngLat);
      }}
    >
      <NavigationControl position="top-right" />
      <ScaleControl position="bottom-left" />
      {setLngLat && ( // show only when we are in input mode
        <GeolocateControl // https://visgl.github.io/react-map-gl/docs/api-reference/geolocate-control
          onGeolocate={(e) => {
            // when using geolocation, set external lnglat with coords
            // TODO: only one can be shown on screen, make disappear when user selects with click
            setLngLat &&
              setLngLat({ lng: e.coords.latitude, lat: e.coords.longitude });
          }}
        />
      )}
      {
        // This marker is displayed when a user clicks on the map
        // the conditions are checking for a selected location and
        // theh setLngLat external function is defined
        selectedLngLat && setLngLat && (
          <Marker
            key={0}
            longitude={selectedLngLat.lng}
            latitude={selectedLngLat.lat}
            element="default"
          ></Marker>
        )
      }
      {
        // General loop for adding markers as per provided data
        data &&
          data.map((post) =>
            Math.abs(post.lat) < 90 && Math.abs(post.lon) < 180 ? ( // lat lon validation
              <Marker key={post.id} latitude={post.lat} longitude={post.lon}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPost(post);
                  }}
                >
                  <Image
                    src={markerImgSrc(post.projecttype)}
                    alt="ONG"
                    height={30}
                    width={30}
                  />
                </button>
              </Marker>
            ) : null
          )
      }

      {
        // popup to show post information on data driven markers
        selectedPost && (
          <Popup
            closeOnClick={false}
            latitude={selectedPost.lat}
            longitude={selectedPost.lon}
            onClose={() => {
              setSelectedPost(null);
            }}
          >
            <div>
              <h1 className="text-lg">{selectedPost.title}</h1>
              <p>{`${selectedPost.description.slice(0, 100)}${
                selectedPost.description.length >= 100 ? "..." : ""
              }`}</p>
            </div>
          </Popup>
        )
      }
    </Map>
  );
}

export default MapView;
