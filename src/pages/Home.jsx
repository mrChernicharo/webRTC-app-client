import { Link, useNavigate } from "react-router-dom";
import JoinRoomForm from "../components/JoinRoomForm";

function Home() {
    return (
        <div className="home">
            <h3>Home</h3>
            <h1>Welcome to Video Chatz</h1>

            <JoinRoomForm />
        </div>
    );
}

export default Home;
