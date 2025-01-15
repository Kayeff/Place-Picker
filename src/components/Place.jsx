export default function Place({place}) {
  return (
    <button className="w-full border border-raisin-black rounded-xl">
        <img className="rounded-t-xl" src={place.image.src} alt={place.image.alt} />
        <p className="font-medium p-1 tracking-tight">{place.title}</p>
    </button>
  )
}
