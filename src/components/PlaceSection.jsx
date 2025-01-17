export default function PlaceSection({ fallbackText, title, children }) {
  return (
    <section className="w-[80%] border border-slate-400/30 m-auto p-4 rounded-xl flex items-center justify-center flex-col space-y-8 cursor-default">
      <h1 className="font-semibold text-2xl tracking-tight text-raisin-black">
        {title}
      </h1>
      <h1 className="font-medium text-sm text-slate-500/60">{fallbackText}</h1>
      <div className="w-full grid grid-cols-4 gap-4">{children}</div>
    </section>
  );
}
