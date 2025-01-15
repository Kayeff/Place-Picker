import { useImperativeHandle, forwardRef, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal(_, ref) {
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            open(){
                dialog.current.showModal();
            },
        }
    })

  return createPortal(
    <dialog ref={dialog} className="w-[30rem] flex items-center justify-center bg-linen p-4 rounded-xl flex-col font-Switzer space-y-4 backdrop:bg-[rgba(0,0,0,0.4)] cursor-default">
        <div className="w-full">
            <h1 className="font-semibold text-2xl tracking-tight">You really want to remove the place ?</h1>
        </div>
        <form method="dialog" className="w-full flex items-center justify-end space-x-1.5">
            <button className="text-sm px-4 py-3 bg-raisin-black text-linen hover:bg-persian-red font-medium rounded-lg transition-colors">Cancel</button>
            <button className="text-sm px-4 py-3 bg-raisin-black text-linen rounded-lg font-medium hover:bg-verdigris transition-colors hover:text-raisin-black">Remove</button>
        </form>
    </dialog>,
    document.getElementById("modal"),
  )
})

export default Modal;