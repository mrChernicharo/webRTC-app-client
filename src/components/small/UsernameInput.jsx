import { useContext, useRef } from "react";
import { UserContext } from "../../UserContext";

export default function UsernameInput() {
    const { setUserName, name } = useContext(UserContext);
    const inputRef = useRef(null);

    return (
        <div className="flex flex-col">
            <input
                ref={inputRef}
                id="username"
                className="input mb-2"
                placeholder="username"
                defaultValue={name}
                onKeyDown={(e) => {
                    if (inputRef.current.value && e.key === "Enter" && !e.shiftKey) setUserName(inputRef.current.value);
                }}
            />

            <button className="btn btn-primary" type="button" onClick={() => setUserName(inputRef.current.value)}>
                Save username
            </button>
        </div>
    );
}
