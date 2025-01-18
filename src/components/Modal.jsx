import { useImperativeHandle, forwardRef, useRef } from "react";
import { createPortal } from "react-dom";
import { AVAILABLE_PLACES } from "../data";

const Modal = forwardRef(function Modal(
  { placeID, handleCancel, handleRemove },
  ref
) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });

  let title;
  if (placeID !== undefined) {
    title = AVAILABLE_PLACES.find((place) => place.id === placeID).title;
  } else {
    title = "";
  }

  return createPortal(
    <dialog
      ref={dialog}
      className="w-[30rem] flex items-center justify-center bg-linen p-4 rounded-xl flex-col font-Switzer space-y-8 backdrop:bg-[rgba(0,0,0,0.4)] cursor-default shadow-modal"
    >
      <div className="w-full">
        <h1 className="font-semibold text-2xl tracking-tight">
          You really want to remove the place?
        </h1>
        <h1 className="font-semibold text-2xl tracking-tight text-davys-gray">
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
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
