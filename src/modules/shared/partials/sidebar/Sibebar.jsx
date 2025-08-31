import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaBars,
    FaHome,
    FaUser,
    FaUserGraduate,
    FaBuilding,
    FaChalkboardTeacher,
    FaBriefcase
} from "react-icons/fa";
import usePermissions from "../../hooks/usePermissions";
import "./Sidebar.css";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { isAdmin, isTutor } = usePermissions();

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
            {/* Logo */}
            <div className="sidebar-header">
                {isOpen && (
                    <div className="sidebar-logo">
                        <img
                            src="/LOGO_CON_TEXTO_GRANDE.jpg"
                            alt="Logo"
                            className="logo-image"
                        />
                    </div>
                )}
                <button onClick={toggleSidebar} className="toggle-button">
                    <FaBars />
                </button>
            </div>

            <nav className="sidebar-nav">
                <Link to="/" className="sidebar-link">
                    <FaHome className="icon" />
                    {isOpen && <span>Home</span>}
                </Link>
            </nav>

            {isAdmin && (
                <>
                    <nav className="sidebar-nav">
                        <Link to="/usuarios" className="sidebar-link">
                            <FaUser className="icon" />
                            {isOpen && <span>Usuarios</span>}
                        </Link>
                    </nav>

                    <nav className="sidebar-nav">
                        <Link to="/tutors" className="sidebar-link">
                            <FaChalkboardTeacher className="icon" />
                            {isOpen && <span>Docentes</span>}
                        </Link>
                    </nav>
                </>
            )}

            {(isAdmin || isTutor) && (
                <>
                    <nav className="sidebar-nav">
                        <Link to="/students" className="sidebar-link">
                            <FaUserGraduate className="icon" />
                            {isOpen && <span>Alumnos</span>}
                        </Link>
                    </nav>

                    <nav className="sidebar-nav">
                        <Link to="/companies" className="sidebar-link">
                            <FaBuilding className="icon" />
                            {isOpen && <span>Empresas</span>}
                        </Link>
                    </nav>

                    <nav className="sidebar-nav">
                        <Link to="/offers" className="sidebar-link">
                            <FaBriefcase className="icon" />
                            {isOpen && <span>Ofertas</span>}
                        </Link>
                    </nav>
                </>
            )}
        </div>
    );
};