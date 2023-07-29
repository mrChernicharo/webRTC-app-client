import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import UsernameInput from "./components/UsernameInput";

function Header() {
    const { id, name } = useContext(UserContext);

    return (
        <header style={{ border: "1px solid", textAlign: "right", padding: "0.5rem 1rem" }}>
            <div>{location.pathname !== "/" && <Link to="/">back</Link>}</div>
            <div>{id && <span>userID: {id}</span>}</div>
            <div>{!name ? <UsernameInput /> : <span>username: {name || "unknown"}</span>}</div>
        </header>
    );
}

export default Header;
