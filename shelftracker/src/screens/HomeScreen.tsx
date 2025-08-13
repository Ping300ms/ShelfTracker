import { EquipmentList } from "../components/homeScreen/EquipmentList.tsx";
import { useAuth } from "../hooks/AuthHook.ts";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";

function HomeScreen() {
    const { signOut, user } = useAuth();
    const navigate = useNavigate();

    const useSignOut = async () => {
        await signOut();
        navigate ("/ShelfTracker/login");
    }

    useEffect(() => {
        if (!user) {
            navigate("/ShelfTracker/login");
        }
    })

    return (
        <div>
            <button
                onClick={useSignOut}
                style={{
                    marginBottom: "1rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ff6b6b",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                }}
            >
                Se déconnecter
            </button>
            <EquipmentList />
        </div>
    );
}

export default HomeScreen;
