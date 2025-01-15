import Header from "./components/Header";
import Place from "./components/Place";
import PlaceSection from "./components/PlaceSection";
import {AVAILABLE_PLACES} from "./data";

export default function App() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden bg-linen font-Switzer space-y-8">
      <Header />
      <PlaceSection title="Places I would like to visit">
        Places....
      </PlaceSection>
      <PlaceSection title="Available Places">
        {AVAILABLE_PLACES.map(place => {
          return <Place key={place.id} place={place} />
        })}
      </PlaceSection>
    </main>
  )
}
