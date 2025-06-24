import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaHome } from "react-icons/fa";
import "./Sidebar.css";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

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
                    {isOpen && <span>Dashboard</span>}
                </Link>
            </nav>

            <nav className="sidebar-nav">
                <Link to="/users" className="sidebar-link">
                    <FaHome className="icon" />
                    {isOpen && <span>Usuarios</span>}
                </Link>
            </nav>

            <nav className="sidebar-nav">
                <Link to="/students" className="sidebar-link">
                    <FaHome className="icon" />
                    {isOpen && <span>Alumnos</span>}
                </Link>
            </nav>

            <nav className="sidebar-nav">
                <Link to="/companies" className="sidebar-link">
                    <FaHome className="icon" />
                    {isOpen && <span>Empresas</span>}
                </Link>
            </nav>

            <nav className="sidebar-nav">
                <Link to="/teachers" className="sidebar-link">
                    <FaHome className="icon" />
                    {isOpen && <span>Docentes</span>}
                </Link>
            </nav>

            <nav className="sidebar-nav">
                <Link to="/offers" className="sidebar-link">
                    <FaHome className="icon" />
                    {isOpen && <span>Ofertas</span>}
                </Link>
            </nav>

            <nav className="sidebar-nav">
                <Link to="/candidacies" className="sidebar-link">
                    <FaHome className="icon" />
                    {isOpen && <span>Postulaciones</span>}
                </Link>
            </nav>
        </div>
    );
};
