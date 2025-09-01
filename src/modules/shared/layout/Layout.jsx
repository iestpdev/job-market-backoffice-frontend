import { useState } from "react";
import { Sidebar } from "../partials/sidebar/Sibebar";
import Navbar from "../partials/navbar/Navbar";

const Layout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar isOpen={isOpen} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Navbar toggleSidebar={toggleSidebar} />
                <main
                    style={{
                        flex: 1,
                        overflow: "auto",
                        padding: "1rem",
                    }}
                    className="bg-gray-50"
                >
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;