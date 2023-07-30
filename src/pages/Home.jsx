import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home">
            <h3>Home</h3>
            <h1>WebRTC</h1>

            <Link to="/create">Create Room</Link>
        </div>
    );
}

export default Home;
