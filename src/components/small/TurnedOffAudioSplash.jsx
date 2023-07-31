import { FaMicrophone, FaMicrophoneAlt, FaMicrophoneAltSlash, FaMicrophoneSlash } from "react-icons/fa";
import { videoConstraints } from "../../useWebRTC";

const { width, height } = videoConstraints;
const style = {
    width,
    // border: "1px solid red",
    // color: "red",
};

function TurnedOffAudioSplash() {
    // style={{ width, height }}
    return (
        <div style={style} className="relative h-16 -top-16 -mb-16">
            <div className="bg-transparent flex justify-center items-center">
                <div className="rounded-full py-2 text-red-600">
                    <FaMicrophoneAltSlash size={42} />
                </div>
            </div>
        </div>
    );
}

export default TurnedOffAudioSplash;
