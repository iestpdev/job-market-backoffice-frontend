import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaBars,
    FaHome,
    FaUser,
    FaUserGraduate,
    FaBuilding,
    FaChalkboardTeacher,
    FaBriefcase,
    FaClipboardList,
} from "react-icons/fa";
import usePermissions from "../../hooks/usePermissions";
import "./Sidebar.css";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { isAdmin, isTutor } = usePermissions();

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
            <div className="sidebar-header">
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

            {/* Futuro: para alumnos */}
            {/* 
            <nav className="sidebar-nav">
                <Link to="/candidacies" className="sidebar-link">
                <FaClipboardList className="icon" />
                {isOpen && <span>Postulaciones</span>}
                </Link>
            </nav>
            */}
        </div>
    );
};
