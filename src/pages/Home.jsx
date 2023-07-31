import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home">
            <h3>Home</h3>
            <h1 className="bg-red-500">Welcome to webRTC App</h1>

            <Link to="/create">Create Room</Link>
        </div>
    );
}

export default Home;
