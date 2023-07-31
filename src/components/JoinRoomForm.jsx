import { Link, useNavigate } from "react-router-dom";

function JoinRoomForm() {
    const navigateTo = useNavigate();

    function handleGoToCreateRoom(e) {
        navigateTo("/create");
    }

    function handleJoinExisting(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        navigateTo(`/room/${formData.get("roomID")}`);
    }

    return (
        <div className="home flex flex-col items-center">
            <div className="">
                <button className="text-3xl" onClick={handleGoToCreateRoom}>
                    Host a meeting
                </button>
            </div>

            <div className="flex items-center my-4">
                <div className="w-12 h-[1px] bg-white"></div>
                <div className="mx-4">or</div>
                <div className="w-12 h-[1px] bg-white"></div>
            </div>

            <form onSubmit={handleJoinExisting} className="flex flex-col w-[320px] items-center">
                <h2>Join a Room</h2>
                <input id="roomID" name="roomID" placeholder="room ID" />
            </form>
        </div>
    );
}

export default JoinRoomForm;
