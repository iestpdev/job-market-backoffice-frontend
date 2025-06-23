import { Sidebar } from "../partials/sidebar/sibebar";

const Layout = ({ children }) => {
    return (
        <>
            <Sidebar />
            <main>{children}</main>
        </>
    );
};

export default Layout;