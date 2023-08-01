import { useEffect, useRef } from "react";

export default function OutsideClick({ children, onOutsideClick }) {
    const ref = useRef(null);

    useEffect(() => {
        const outsideClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                onOutsideClick && onOutsideClick(e);
            }
        };

        document.addEventListener("click", outsideClick, true);

        return () => {
            document.removeEventListener("click", outsideClick, true);
        };
    }, [onOutsideClick]);

    return <div ref={ref}>{children}</div>;
}
