import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";
import UsernameInput from "./UsernameInput";
import { FaViadeo, FaArrowLeft } from "react-icons/fa";

function Header() {
    const { id, name } = useContext(UserContext);

    // style={{ border: "1px solid", width: "100%", textAlign: "right", padding: "0.5rem 1rem" }}
    return (
        <header className="border w-full py-2 px-4 flex justify-between">
            <div className="flex gap-4">
                <FaViadeo size={24} />
                <div>{!name ? <UsernameInput /> : <span>username: {name || "unknown"}</span>}</div>
            </div>
            <div className="flex gap-4 items-center">
                <div>{id && <span>userID: {id}</span>}</div>
                <div>
                    {location.pathname !== "/" && (
                        <Link to="/">
                            <FaArrowLeft />
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
