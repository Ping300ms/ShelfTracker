import {CartEquipmentList} from "../components/cartScreen/CartEquipmentList.tsx";
import FloatingCheckout from "../components/cartScreen/FloatingCheckout.tsx";

function CartScreen() {

    return (
        <div>
            <CartEquipmentList/>
            <FloatingCheckout/>
        </div>
    );
}
export default CartScreen;