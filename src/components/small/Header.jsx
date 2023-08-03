import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { Link, useNavigate } from "react-router-dom";
import UsernameInput from "./UsernameInput";
import { FaViadeo, FaArrowLeft } from "react-icons/fa";

function Header() {
    const { id, name } = useContext(UserContext);
    const navigateTo = useNavigate();

    // style={{ border: "1px solid", width: "100%", textAlign: "right", padding: "0.5rem 1rem" }}
    return (
        <header className="border w-full py-2 px-4 flex justify-between">
            <div className="flex gap-4">
                <FaViadeo size={24} />
                <div>{!!name && name}</div>
                {/* <div>{!name ? <UsernameInput /> : <span>username: {name || "unknown"}</span>}</div> */}
            </div>
            <div className="flex gap-4 items-center">
                <div>{id && <span>userID: {id}</span>}</div>
                <div>
                    {location.pathname !== "/" && (
                        <a
                            href="#"
                            onClick={(e) => {
                                if (
                                    location.pathname !== "/create" &&
                                    confirm(
                                        "Are you sure you want to navigate away from this page?\n..... ...\n...  ... \nPress OK to continue, or Cancel to stay on the current page."
                                    )
                                )
                                    navigateTo("/");
                            }}
                        >
                            <FaArrowLeft />
                        </a>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
