import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Place from "./components/Place";
import PlaceSection from "./components/PlaceSection";
import { AVAILABLE_PLACES } from "./data";
import { RiAddLine, RiSubtractLine } from "@remixicon/react";
import Modal from "./components/Modal";

export default function App() {
  const modal = useRef();
  const [addedPlace, setAddedPlace] = useState({
    places: [],
    selectedPlaceID: undefined,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  function addPlace(placeID) {
    setAddedPlace((prevPlace) => {
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
  }

  function removePlace(placeID) {
    modal.current.open();
    addedPlace.selectedPlaceID = placeID;
  }

  function handleRemove() {
    setAddedPlace((prevPlace) => {
      return {
        ...prevPlace,
        places: prevPlace.places.filter(
          (place) => place.id !== addedPlace.selectedPlaceID
        ),
      };
    });
    modal.current.close();
  }

  function handleCancel() {
    modal.current.close();
    addedPlace.selectedPlaceID = undefined;
  }

  return (
    <main className="w-full min-h-screen overflow-x-hidden bg-linen font-Switzer space-y-8 relative">
      <Modal
        handleRemove={handleRemove}
        handleCancel={handleCancel}
        ref={modal}
      />
      <Header />
      <PlaceSection
        fallbackText={addedPlace.places.length === 0 ? "Add places here" : ""}
        title="Places I would like to visit"
      >
        {addedPlace.places.map((place) => {
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
        {AVAILABLE_PLACES.map((place) => {
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
