import { HomeEquipmentList } from "../components/homeScreen/HomeEquipmentList.tsx";
import {useNavigate} from "react-router-dom";
import {useCart} from "../hooks/CartHook.ts";
import TopBar from "../components/common/TopBar.tsx";
import FloatingButton from "../components/common/FloatingButton.tsx";
import {IoCartOutline} from "react-icons/io5";

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
            {cart.length > 0 && <FloatingButton icon={IoCartOutline}
                                                onClick={handleCartClick}/>}
        </div>
    );
}

export default HomeScreen;
