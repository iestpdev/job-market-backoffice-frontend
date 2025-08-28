import { useAtomValue, useSetAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom";
import { authAtom } from "../../../auth/atoms/authAtom";
import usePermissions from "../../hooks/usePermissions";
import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
    const auth = useAtomValue(authAtom);
    const setAuth = useSetAtom(authAtom);
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const {
        isAdmin,
        adminId,
        isTutor,
        tutorId,
    } = usePermissions();

    const handleLogout = () => {
        localStorage.removeItem("auth");
        setAuth({ isAuthenticated: false, token: null, user: null });
        navigate("/login");
    };

    // Función para cerrar el dropdown cuando se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            const dropdownWrapper = document.querySelector(".navbar-avatar-wrapper");
            const dropdownMenu = document.querySelector(".navbar-dropdown");

            // Si el clic no está dentro del wrapper ni del dropdown, cierra el menú
            if (
                dropdownOpen &&
                !dropdownWrapper.contains(event.target) &&
                !dropdownMenu?.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        // Agregar el listener al documento
        document.addEventListener("mousedown", handleClickOutside);

        // Limpiar el listener al desmontar el componente
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    if (!auth.isAuthenticated) return null;

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-logo">IESTP JOBS</Link>
            </div>

            <div className="navbar-right">
                <div className="mr-3 text-sm text-gray-700 font-medium hidden sm:block">
                    {auth.user?.username}
                </div>
                <div
                    className="navbar-avatar-wrapper"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    <img
                        src={`https://ui-avatars.com/api/?name=${auth.user?.username}&background=0358CB&color=FFFFFF`}
                        alt="avatar"
                        className="navbar-avatar"
                    />
                    {dropdownOpen && (
                        <div className="navbar-dropdown">
                            {isAdmin && adminId && (
                                <Link to={`/user/edit/${adminId}`} className="dropdown-item">Mi Perfil</Link>
                            )}
                            {isTutor && tutorId && (
                                <Link to={`/tutors/edit/${tutorId}`} className="dropdown-item">Mi Perfil</Link>
                            )}
                            <button onClick={handleLogout} className="dropdown-item">Cerrar sesión</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}