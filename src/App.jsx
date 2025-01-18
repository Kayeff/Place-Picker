import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Place from "./components/Place";
import PlaceSection from "./components/PlaceSection";
import { AVAILABLE_PLACES } from "./data";
import { RiAddLine, RiSubtractLine } from "@remixicon/react";
import Modal from "./components/Modal";
import { sortPlacesByDistance } from "./loc";

const storedID = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedID.map((id) =>
  AVAILABLE_PLACES.find((places) => places.id === id)
);

export default function App() {
  const modal = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState({
    places: storedPlaces,
    selectedPlaceID: undefined,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      setAvailablePlaces(sortedPlaces);
    }),
      (error) => {
        console.error("Error fetching location:", error.message);
        setAvailablePlaces(AVAILABLE_PLACES);
      };
  }, []);

  function addPlace(placeID) {
    setPickedPlaces((prevPlace) => {
      const place = AVAILABLE_PLACES.find((place) => place.id === placeID);
      const existingPlace = prevPlace.places.some(
        (place) => place.id === placeID
      );

      if (existingPlace) {
        return {
          ...prevPlace,
        };
      }

      return {
        ...prevPlace,
        places: [...prevPlace.places, place],
      };
    });

    const storedID = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    if (storedID.indexOf(placeID) === -1) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([placeID, ...storedID])
      );
    }
  }

  function removePlace(placeID) {
    modal.current.open();
    setPickedPlaces((prevPlace) => {
      return {
        ...prevPlace,
        selectedPlaceID: placeID,
      };
    });
  }

  function handleRemove() {
    setPickedPlaces((prevPlace) => {
      return {
        ...prevPlace,
        places: prevPlace.places.filter(
          (place) => place.id !== pickedPlaces.selectedPlaceID
        ),
      };
    });

    const storedID = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    const updatedStoredID = storedID.filter(
      (id) => id !== pickedPlaces.selectedPlaceID
    );

    localStorage.setItem("selectedPlaces", JSON.stringify(updatedStoredID));
    modal.current.close();
  }

  function handleCancel() {
    modal.current.close();
    setPickedPlaces((prevPlace) => {
      return {
        ...prevPlace,
        selectedPlaceID: undefined,
      };
    });
  }

  return (
    <main className="w-full min-h-screen overflow-x-hidden bg-linen font-Switzer space-y-8 relative">
      <Modal
        placeID={pickedPlaces.selectedPlaceID}
        handleRemove={handleRemove}
        handleCancel={handleCancel}
        ref={modal}
      />
      <Header />
      <PlaceSection
        fallbackText={
          pickedPlaces.places.length === 0
            ? "Once added your places would appear here"
            : ""
        }
        title="Places I would like to visit"
      >
        {pickedPlaces.places.map((place) => {
          return (
            <Place
              key={place.id}
              place={place}
              onClick={removePlace}
              Icon={RiSubtractLine}
            />
          );
        })}
      </PlaceSection>
      <PlaceSection title="Available Places">
        {availablePlaces.map((place) => {
          return (
            <Place
              key={place.id}
              place={place}
              onClick={addPlace}
              Icon={RiAddLine}
            />
          );
        })}
      </PlaceSection>
    </main>
  );
}
