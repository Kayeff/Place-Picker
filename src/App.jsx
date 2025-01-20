import { useEffect, useCallback, useState } from "react";
import Header from "./components/Header";
import Place from "./components/Place";
import PlaceSection from "./components/PlaceSection";
import { AVAILABLE_PLACES } from "./data";
import { RiAddLine, RiSubtractLine } from "@remixicon/react";
import Modal from "./components/Modal";
import { sortPlacesByDistance } from "./loc";
import DeleteConfirmation from "./components/DeleteConfirmation";

const storedID = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedID
  .map((id) => AVAILABLE_PLACES.find((places) => places.id === id))
  .filter(Boolean);

export default function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState({
    places: storedPlaces,
    selectedPlaceID: undefined,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const sortedPlaces = sortPlacesByDistance(
          AVAILABLE_PLACES,
          position.coords.latitude,
          position.coords.longitude
        );
        setAvailablePlaces(sortedPlaces);
      },
      (error) => {
        console.error("Error fetching location:", error.message);
        setAvailablePlaces(AVAILABLE_PLACES);
      }
    );
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
    setPickedPlaces((prevPlace) => {
      return {
        ...prevPlace,
        selectedPlaceID: placeID,
      };
    });

    setModalIsOpen(true);
  }

  const handleRemove = useCallback(
    function handleRemove() {
      setPickedPlaces((prevPlace) => {
        return {
          ...prevPlace,
          places: prevPlace.places.filter(
            (place) => place.id !== pickedPlaces.selectedPlaceID
          ),
        };
      });

      setModalIsOpen(false);

      const storedID = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
      const updatedStoredID = storedID.filter(
        (id) => id !== pickedPlaces.selectedPlaceID
      );
      localStorage.setItem("selectedPlaces", JSON.stringify(updatedStoredID));
    },
    [pickedPlaces.selectedPlaceID]
  );

  function handleCancel() {
    setModalIsOpen(false);
    setPickedPlaces((prevPlace) => {
      return {
        ...prevPlace,
        selectedPlaceID: undefined,
      };
    });
  }

  let title;
  if (pickedPlaces.selectedPlaceID !== undefined) {
    const selectedPlace = availablePlaces.find(
      (place) => place.id === pickedPlaces.selectedPlaceID
    );
    title = selectedPlace.title;
  } else {
    title = "";
  }

  return (
    <main className="w-full min-h-screen overflow-x-hidden bg-linen font-Switzer space-y-8 relative">
      <Modal
        open={modalIsOpen}
        handleCancel={handleCancel}
        handleRemove={handleRemove}
      >
        <DeleteConfirmation
          title={title}
          handleCancel={handleCancel}
          handleRemove={handleRemove}
        />
      </Modal>
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
