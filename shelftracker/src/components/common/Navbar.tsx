import { NavLink } from "react-router-dom";
import {IoCalendar, IoHome, IoQrCode, IoSettings} from "react-icons/io5";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar__container">
            <NavLink
                to="/ShelfTracker"
                className={({ isActive }) =>
                    isActive ? "navbar__item active" : "navbar__item"
                }
                end
            >
                <IoHome size={24} />
            </NavLink>

            <NavLink
                to="/ShelfTracker/scan"
                className={({ isActive }) =>
                    isActive ? "navbar__item active" : "navbar__item"
                }
            >
                <IoQrCode size={24} />
            </NavLink>

            <NavLink
                to="/ShelfTracker/calendar"
                className={({ isActive }) =>
                    isActive ? "navbar__item active" : "navbar__item"
                }
            >
                <IoCalendar size={24} />
            </NavLink>

            <NavLink
                to="/ShelfTracker/profile"
                className={({ isActive }) =>
                    isActive ? "navbar__item active" : "navbar__item"
                }
            >
                <IoSettings size={24} />
            </NavLink>
        </nav>
    );
}

export default Navbar;