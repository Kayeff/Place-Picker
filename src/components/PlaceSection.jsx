

export default function PlaceSection({title, children}) {
  return (
    <section className="w-[80%] border border-slate-400/30 m-auto p-4 rounded-xl flex items-center justify-center flex-col">
        <h1 className="font-medium text-lg text-raisin-black">
            {title}
        </h1>
        <div className="w-full">
            {children}
        </div>
    </section>
  )
}
