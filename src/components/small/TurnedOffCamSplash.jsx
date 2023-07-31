import { FaViadeo } from "react-icons/fa";
import { videoConstraints } from "../../useWebRTC";

const { width, height } = videoConstraints;

export default function TurnedOffCamSplash() {
    return (
        <div style={{ width, height }} className="bg-black flex justify-center items-center">
            <FaViadeo size={64} />
        </div>
    );
}
