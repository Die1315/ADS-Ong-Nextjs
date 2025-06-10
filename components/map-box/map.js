import { useEffect, useState } from "react";
import Image from "next/image";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faInfoCircle,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import configData from "./map.config.json";
import Link from "next/link";
import Modal from "react-modal";

import { formatDate } from "../../utils/dateUtils";

Modal.setAppElement("#__next");

function MapView({
  data,
  setLngLat,
  initialViewState,
  locationToUpdate,
  location,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => setModalIsOpen(true);

  const handleCloseModal = () => setModalIsOpen(false);

  // map viewstate
  const [viewState, setViewState] = useState(
    initialViewState || {
      zoom: 0,
    }
  );

  const [selectedLngLat, setSelectedLngLat] = useState();

  // map selected post popup
  const [selectedPost, setSelectedPost] = useState(null);
  useEffect(() => {
    if (locationToUpdate) setSelectedLngLat(locationToUpdate);
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
      initialViewState={viewState}
      style={{ minHeight: "300px", minWidth: "100%" }}
      // trackResize={true}
      // projection="globe"
      renderWorldCopies={false}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v12"
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
      {location && <Marker latitude={location.lat} longitude={location.lng} />}
      {
        // General loop for adding markers as per provided data
        data &&
          data.map((post) =>
            Math.abs(post.location.coordinates[1]) < 90 &&
            Math.abs(post.location.coordinates[0]) < 180 ? ( // lat lon validation
              <Marker
                key={post.id}
                latitude={post.location.coordinates[1]}
                longitude={post.location.coordinates[0]}
              >
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
            anchor="left"
            latitude={selectedPost.location.coordinates[1]}
            longitude={selectedPost.location.coordinates[0]}
            onClose={() => {
              setSelectedPost(null);
            }}
            className="min-w-20 max-w-20 max-h-50 md:max-h-content overflow-hidden"
          >
            <div className="relative w-full container p-0 md:p-5 min-h-50 md:min-h-60 lg:min-h-50 max-h-90 md:max-h-90 lg:max-h-80 flex flex-col md:flex-row gap-0 justify-between items-stretch bg-light rounded-md mx-auto overflow-x-hidden overflow-y-auto md:overflow-y-hidden">
              <div className="w-full p-2 flex flex-col items-start gap-5">
                <div className="flex justify-start items-start gap-3">
                  <Link href={`/ong/${selectedPost.owner.id}`}>
                    <Image
                      src={selectedPost.owner.image}
                      alt="Post Image"
                      width={200}
                      height={200}
                      className="object-cover w-12 h-12 rounded-full"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <Link href={`/ong/${selectedPost.owner.id}`}>
                      <h4 className="text-dark font-bold text-lg hover:cursor-pointer">
                        {selectedPost.owner.name}
                      </h4>
                    </Link>
                    <p className="text-sm">{selectedPost.owner.category}</p>
                  </div>
                </div>
                <Image
                  src={selectedPost.image}
                  alt="Post Image"
                  width={500}
                  height={500}
                  className="object-cover cursor-pointer max-h-96"
                  onClick={handleOpenModal}
                />
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={handleCloseModal}
                  contentLabel="Delete Modal"
                  className="post-modal fixed top-0 left-0 z-50 p-5 md:p-0"
                  data-modal-backdrop="static"
                >
                  <div className="relative">
                    <button
                      onClick={handleCloseModal}
                      className="absolute -top-3 right-4"
                    >
                      <FontAwesomeIcon
                        className="fixed text-dark bg-light rounded-full p-2"
                        icon={faTimes}
                        size={30}
                      />
                    </button>
                    <Image
                      src={selectedPost.image}
                      alt="cover picture"
                      width={768}
                      height={500}
                      className="cursor-pointer"
                      onClick={handleOpenModal}
                    />
                  </div>
                </Modal>
                <h2 className="text-lg md:text-2xl font-bold">
                  {selectedPost.title}
                </h2>
                <p className="text-dark text-sm -mt-5">
                  De{" "}
                  <span
                    className="text-primary font-bold hover:text-dark hover:cursor-pointer"
                    onClick={handleOpenModal}
                  >{`${formatDate(
                    selectedPost.startdate.toString()
                  )}`}</span>{" "}
                  a{" "}
                  <span
                    className="text-primary font-bold hover:text-dark hover:cursor-pointer"
                    onClick={handleOpenModal}
                  >
                    {selectedPost.enddate &&
                      `${formatDate(selectedPost.enddate.toString())}`}
                  </span>
                </p>
                <p className="text-gray-600 overflow-y-visible scrollbar scrollbar-thin scrollbar-thumb-secondary scrollbar-track-gray-200">
                  {selectedPost.description}
                </p>
              </div>
            </div>
          </Popup>
        )
      }
    </Map>
  );
}

export default MapView;
