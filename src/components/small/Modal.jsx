import { createPortal } from "react-dom";
import OutsideClick from "./OutsideClick";
import { FaWindowClose } from "react-icons/fa";

export default function Modal({ onClose, noCloseBtn, children }) {
    return createPortal(
        <>
            <OutsideClick onOutsideClick={onClose}>
                <div className="absolute p-6 bg-[#222] z-20 top-[50%] left-[50%]  -translate-x-[50%] -translate-y-[50%]">
                    {noCloseBtn ? null : (
                        <button onClick={onClose}>
                            <FaWindowClose />
                        </button>
                    )}
                    <div>{children}</div>
                </div>
            </OutsideClick>
            <div className="overlay bg-slate-400 fixed w-[10000px] h-[10000px] z-10 top-0 left-0 opacity-30" />
        </>,
        document.body
    );
}
