import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";
import UsernameInput from "./UsernameInput";

function Header() {
    const { id, name } = useContext(UserContext);

    // style={{ border: "1px solid", width: "100%", textAlign: "right", padding: "0.5rem 1rem" }}
    return (
        <header className="border w-full py-2 px-4">
            <div>{location.pathname !== "/" && <Link to="/">back</Link>}</div>
            <div>{id && <span>userID: {id}</span>}</div>
            <div>{!name ? <UsernameInput /> : <span>username: {name || "unknown"}</span>}</div>
        </header>
    );
}

export default Header;
