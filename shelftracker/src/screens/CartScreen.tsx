import {CartEquipmentList} from "../components/cartScreen/CartEquipmentList.tsx";
import {useCart} from "../hooks/CartHook.ts";
import {useNavigate} from "react-router-dom";
import TopBar from "../components/common/TopBar.tsx";
import FloatingButton from "../components/common/FloatingButton.tsx";
import {IoCheckmark} from "react-icons/io5";

function CartScreen() {

    const { cart } = useCart()
    const navigate = useNavigate()

    const onClick = () => {
        navigate("/ShelfTracker/checkout")
    }

    return (
        <div>
            <TopBar title={"Panier"}/>
            <CartEquipmentList/>
            {cart.length > 0 && <FloatingButton icon={IoCheckmark}
                                                onClick={onClick}
                                                color={"var(--tertiary-color)"}/>}

        </div>
    );
}
export default CartScreen;