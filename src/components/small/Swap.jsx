// import { FaHeart, Fa500Px, FaAmbulance } from "react-icons/fa";

function Swap({ checked, On, Off }) {
    return (
        <label className="swap swap-rotate">
            <input type="checkbox" checked={checked} />

            <div className="swap-on fill-current">{On}</div>

            <div className="swap-off fill-current">{Off}</div>
        </label>
    );
}

export default Swap;
