import { Sidebar } from "../partials/sidebar/Sibebar";
import Navbar from "../partials/navbar/Navbar";

const Layout = ({ children }) => {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Navbar />
                <main style={{ padding: "1rem", flex: 1 }}>{children}</main>
            </div>
        </div>
    );
};

export default Layout;
