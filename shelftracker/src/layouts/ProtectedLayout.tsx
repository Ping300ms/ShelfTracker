// src/layouts/ProtectedLayout.tsx
import Navbar from "../components/common/Navbar.tsx";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="protected-layout">
            <div className="content">{children}</div>
            <Navbar />
        </div>
    );
}

export default ProtectedLayout;
