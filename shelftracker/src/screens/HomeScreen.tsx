import { EquipmentList } from "../components/homeScreen/EquipmentList.tsx";
import FloatingCart from "../components/homeScreen/FloatingCart.tsx";
import {useNavigate} from "react-router-dom";

function HomeScreen() {
    const navigate = useNavigate();

    const handleCartClick = () => {
        navigate("/ShelfTracker/cart");
    };

    return (
        <div>
            <EquipmentList />
            <FloatingCart onClick={handleCartClick} />
        </div>
    );
}

export default HomeScreen;
