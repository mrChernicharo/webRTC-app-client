import { BrowserRouter, Routes, Route, useBeforeUnload } from "react-router-dom";
// import CreateRoom from "./pages/CreateRoom";
import Room from "./pages/Room";
import Home from "./pages/Home";
import Layout from "./components/large/Layout";

const HomePage = (
    <Layout>
        <Home />
    </Layout>
);

const RoomPage = (
    <Layout>
        <Room />
    </Layout>
);

function AppRouter() {
    console.log({ importMetaEnv: import.meta.env });

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={HomePage} />
                <Route path="/room/:roomId" element={RoomPage} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
