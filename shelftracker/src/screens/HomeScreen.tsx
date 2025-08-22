import { HomeEquipmentList } from "../components/homeScreen/HomeEquipmentList.tsx";
import FloatingCart from "../components/homeScreen/FloatingCart.tsx";
import {useNavigate} from "react-router-dom";
import {useCart} from "../hooks/CartHook.ts";
import TopBar from "../components/common/TopBar.tsx";

function HomeScreen() {
    const navigate = useNavigate();

    const handleCartClick = () => {
        navigate("/ShelfTracker/cart");
    };

    const { cart } = useCart();

    return (
        <div>
            <TopBar title={"Accueil"} cantGoBack={true}/>
            <HomeEquipmentList />
            {cart.length > 0 && <FloatingCart onClick={handleCartClick} />}
        </div>
    );
}

export default HomeScreen;
