import { useRef, useState } from "react";
import Header from "./components/Header";
import Place from "./components/Place";
import PlaceSection from "./components/PlaceSection";
import { AVAILABLE_PLACES } from "./data";
import { RiAddLine, RiSubtractLine } from "@remixicon/react";
import Modal from "./components/Modal";

export default function App() {
  const [addedPlace, setAddedPlace] = useState({
    places: []
  });
  const modal = useRef();

  function addPlace(placeID) {
    setAddedPlace(prevPlace => {
      const place = AVAILABLE_PLACES.find(place => place.id === placeID);
      const existingPlace = addedPlace.places.find(place => place.id === placeID);

      if (existingPlace) {
        return {
          ...prevPlace,
        };
      }

      return {
        ...prevPlace,
        places: [...prevPlace.places, place],
      }
    });
  }

  function removePlace(placeID) {
    modal.current.open();
    setAddedPlace(prevPlace => {
      return {
        ...prevPlace,
        places: prevPlace.places.filter(place => place.id !== placeID),
      }
    });
  }

  return (
      <main className="w-full min-h-screen overflow-x-hidden bg-linen font-Switzer space-y-8 relative">
        <Modal ref={modal} />
        <Header />
        <PlaceSection title="Places I would like to visit">
          {addedPlace.places.map(place => {
            return <Place
              key={place.id}
              place={place}
              onClick={removePlace}
              Icon={RiSubtractLine} />
          })}
        </PlaceSection>
        <PlaceSection title="Available Places">
          {AVAILABLE_PLACES.map(place => {
            return <Place
              key={place.id}
              place={place}
              onClick={addPlace}
              Icon={RiAddLine} />
          })}
        </PlaceSection>
      </main>
  )
}
