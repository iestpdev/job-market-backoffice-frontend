import { useState } from "react";
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
                <a href="/" className="sidebar-link">
                    <FaHome className="icon" />
                    {isOpen && <span>Dashboard</span>}
                </a>
            </nav>
            
            <nav className="sidebar-nav">
                <a href="/students" className="sidebar-link">
                    <FaHome className="icon" />
                    {isOpen && <span>Alumnos</span>}
                </a>
            </nav>

            <nav className="sidebar-nav">
                <a href="/companies" className="sidebar-link">
                    <FaHome className="icon" />
                    {isOpen && <span>Empresas</span>}
                </a>
            </nav>

            <nav className="sidebar-nav">
                <a href="/teachers" className="sidebar-link">
                    <FaHome className="icon" />
                    {isOpen && <span>Docentes</span>}
                </a>
            </nav>

            <nav className="sidebar-nav">
                <a href="/offers" className="sidebar-link">
                    <FaHome className="icon" />
                    {isOpen && <span>Ofertas</span>}
                </a>
            </nav>

            <nav className="sidebar-nav">
                <a href="/candidacies" className="sidebar-link">
                    <FaHome className="icon" />
                    {isOpen && <span>Postulaciones</span>}
                </a>
            </nav>
        </div>
    );
};
