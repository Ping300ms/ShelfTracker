import {CartList} from "../components/cartScreen/CartList.tsx";
import FloatingCheckout from "../components/cartScreen/FloatingCheckout.tsx";

function CartScreen() {

    return (
        <div>
            <CartList/>
            <FloatingCheckout/>
        </div>
    );
}
export default CartScreen;