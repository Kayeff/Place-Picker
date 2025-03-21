import logo from "../assets/logo.png";

export default function Header() {
  return (
    <div className="w-full flex items-center justify-center flex-col cursor-default space-y-4 p-4">
      <div className="w-full flex items-center justify-center">
        <img className="object-cover w-28" src={logo} alt="" />
      </div>
      <div className="flex items-center justify-center flex-col">
        <h1 className="font-semibold text-5xl uppercase tracking-tight text-raisin-black">
          placepicker
        </h1>
        <p className="text-sm font-medium text-slate-700/70">
          Create a personal collection of places you would like to visit or you
          have visited
        </p>
      </div>
    </div>
  );
}
