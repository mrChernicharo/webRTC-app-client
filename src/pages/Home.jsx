import { Link, useNavigate } from "react-router-dom";
import JoinRoomForm from "../components/large/JoinRoomForm";
import { idMaker } from "../idMaker";

function Home() {
    const navigateTo = useNavigate();

    function handleCreateNewRoom(e) {
        const uuid = idMaker(32);
        navigateTo(`/room/${uuid}`);
    }

    return (
        <div className="home">
            <h3>Home</h3>
            <h1>Welcome to Video Chatz</h1>

            <div className="border">
                <div className="w-full text-center mb-4">
                    <button className="btn btn-accent" onClick={handleCreateNewRoom}>
                        Host a meeting
                    </button>
                </div>

                <JoinRoomForm />
            </div>
        </div>
    );
}

export default Home;
