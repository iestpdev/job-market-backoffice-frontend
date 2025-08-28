import { Sidebar } from "../partials/sidebar/Sibebar";
import Navbar from "../partials/navbar/Navbar";

const Layout = ({ children }) => {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Navbar />
                <main style={{ flex: 1, overflow: "auto", padding: "1rem" }} className="bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
