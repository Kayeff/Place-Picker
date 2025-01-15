import Header from "./components/Header";
import PlaceSection from "./components/PlaceSection";

export default function App() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden bg-linen font-Switzer space-y-8">
      <Header />
      <PlaceSection title="Places I would like to visit">
        Places....
      </PlaceSection>
      <PlaceSection title="Available Places">
        Places....
      </PlaceSection>
    </main>
  )
}
