import { useState } from "react"

export default function Place({place, onClick, Icon}) {
  const [visible, setIsVisible] = useState(false);

  function handleMouseEnter(){
    setIsVisible(true);
  }

  function handleMouseLeave(){
    setIsVisible(false);
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
      className="w-full border border-raisin-black rounded-xl shadow-place transition-shadow relative flex items-center justify-center flex-col">
        <img className="rounded-t-xl" src={place.image.src} alt={place.image.alt} />
        <p className="font-medium p-1 tracking-tight rounded-b-xl">{place.title}</p>
        {visible && <button className="h-20 w-20 rounded-full bg-[rgba(0,0,0,0.5)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-linen flex items-center justify-center" onClick={() => onClick(place.id)}>
            <Icon size={40} />
        </button>}
    </div>
  )
}
