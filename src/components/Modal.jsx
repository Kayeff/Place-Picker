import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import DeleteConfirmation from "./DeleteConfirmation";

export default function Modal({ title, handleCancel, handleRemove, open }) {
  const dialog = useRef();

  useEffect(() => {
    open ? dialog.current.showModal() : dialog.current.close();
  }, [open]);

  useEffect(() => {
    const timerID = setTimeout(() => {
      handleRemove();
    }, 3000);

    return () => {
      clearTimeout(timerID);
    };
  }, [handleRemove]);

  return createPortal(
    <dialog
      onClose={handleCancel}
      ref={dialog}
      className="w-[30rem] flex items-center justify-center bg-linen p-4 rounded-xl flex-col font-Switzer space-y-8 backdrop:bg-[rgba(0,0,0,0.4)] cursor-default shadow-modal"
    >
      {open ? (
        <DeleteConfirmation
          title={title}
          handleCancel={handleCancel}
          handleRemove={handleRemove}
        />
      ) : null}
    </dialog>,
    document.getElementById("modal")
  );
}
