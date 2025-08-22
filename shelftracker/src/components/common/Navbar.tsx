import { NavLink } from "react-router-dom";
import { IoHome, IoQrCode, IoPerson } from "react-icons/io5"; // icons Ionicons
import "../../styles/Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink
                to="/ShelfTracker"
                className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                }
                end
            >
                <IoHome size={24} />
            </NavLink>

            <NavLink
                to="/ShelfTracker/scan"
                className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                }
            >
                <IoQrCode size={24} />
            </NavLink>

            <NavLink
                to="/ShelfTracker/profile"
                className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                }
            >
                <IoPerson size={24} />
            </NavLink>
        </nav>
    );
}

export default Navbar;