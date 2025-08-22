import { EquipmentList } from "../components/homeScreen/EquipmentList.tsx";
import FloatingCart from "../components/homeScreen/FloatingCart.tsx";

function HomeScreen() {

    const handleCartClick = () => {};

    return (
        <div>
            <EquipmentList />
            <FloatingCart onClick={handleCartClick} />
        </div>
    );
}

export default HomeScreen;
