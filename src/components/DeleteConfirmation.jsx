import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const timer = 10000;
export default function DeleteConfirmation({
  title,
  handleCancel,
  handleRemove,
}) {
  useEffect(() => {
    const timerID = setTimeout(() => {
      handleRemove();
    }, timer);

    return () => {
      clearTimeout(timerID);
    };
  }, [handleRemove]);

  return (
    <div className="w-full space-y-8">
      <div className="w-full">
        <h1 className="font-semibold text-2xl tracking-tight">
          You really want to remove the place?
        </h1>
        <h1 className="font-semibold text-2xl tracking-tight text-persian-red">
          {title}
        </h1>
      </div>
      <form
        method="dialog"
        className="w-full flex items-center justify-end space-x-1.5"
      >
        <button
          onClick={handleCancel}
          className="text-sm px-4 py-2 bg-raisin-black text-linen hover:bg-persian-red font-medium rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleRemove}
          className="text-sm px-4 py-2 bg-raisin-black text-linen rounded-md font-medium hover:bg-dark-slate-gray transition-colors"
        >
          Yes
        </button>
      </form>
      <ProgressBar timer={timer} />
    </div>
  );
}
