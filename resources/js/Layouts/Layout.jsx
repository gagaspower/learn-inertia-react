import Sidebar from "@/components/Sidebar";
import { NavbarComponent } from "../components/Navbar";

export default function Layout({ children }) {
    return (
        <>
            <Sidebar />
            <div className="p-4 lg:ml-64">
                <NavbarComponent />

                <div className="py-4"> {children}</div>
            </div>
        </>
    );
}
