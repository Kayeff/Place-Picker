import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, handleCancel, handleRemove, open }) {
  const dialog = useRef();

  useEffect(() => {
    open ? dialog.current.showModal() : dialog.current.close();
  }, [open]);

  return createPortal(
    <dialog
      onClose={handleCancel}
      ref={dialog}
      className="w-[30rem] flex items-center justify-center bg-linen p-4 rounded-xl flex-col font-Switzer backdrop:bg-[rgba(0,0,0,0.4)] cursor-default shadow-modal"
    >
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
}
