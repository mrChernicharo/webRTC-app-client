import { useContext, useRef } from "react";
import { UserContext } from "../UserContext";

export default function UsernameInput() {
    const { setUserName, name } = useContext(UserContext);
    const inputRef = useRef(null);

    return (
        <div>
            <label htmlFor="username">username</label>
            <input
                ref={inputRef}
                id="username"
                defaultValue={name}
                onKeyDown={(e) => {
                    if (inputRef.current.value && e.key === "Enter" && !e.shiftKey) setUserName(inputRef.current.value);
                }}
            />

            <button type="button" onClick={() => setUserName(inputRef.current.value)}>
                Save username
            </button>
        </div>
    );
}
