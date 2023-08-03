import { BrowserRouter, Routes, Route, useBeforeUnload } from "react-router-dom";
import CreateRoom from "./pages/CreateRoom";
import Room from "./pages/Room";
import Home from "./pages/Home";
import Layout from "./components/large/Layout";
import { useCallback, useEffect } from "react";

const HomePage = (
    <Layout>
        <Home />
    </Layout>
);
const CreateRoomPage = (
    <Layout>
        <CreateRoom />
    </Layout>
);
const RoomPage = (
    <Layout>
        <Room />
    </Layout>
);

function AppRouter() {
    console.log({ importMetaEnv: import.meta.env });

    // useEffect(() => {
    //     window.onbeforeunload = function () {
    //         console.log("are you sure?");
    //         return "";
    //     };
    // }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={HomePage} />
                <Route path="/create" element={CreateRoomPage} />
                <Route path="/room/:roomId" element={RoomPage} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
