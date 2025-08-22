import {CartEquipmentList} from "../components/cartScreen/CartEquipmentList.tsx";
import FloatingCheckout from "../components/cartScreen/FloatingCheckout.tsx";
import {useCart} from "../hooks/CartHook.ts";
import {useNavigate} from "react-router-dom";
import TopBar from "../components/common/TopBar.tsx";

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
            {cart.length > 0 && <FloatingCheckout onClick={onClick}/>}
        </div>
    );
}
export default CartScreen;