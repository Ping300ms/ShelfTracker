import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import { deleteEquipment, getEquipmentById } from "../api/EquipmentsApi";
import { getAllBookings } from "../api/BookingsApi";
import { useEffect, useState } from "react";
import type { Equipment } from "../types/Equipment";
import type { Booking } from "../types/Booking";
import { Loader } from "../components/common/Loader";
import { useCart } from "../hooks/CartHook";
import EquipmentQR from "../components/common/EquipmentQR";

import { EquipmentHeader } from "../components/equipmentDetailScreen/EquipmentHeader";
import { EquipmentNotes } from "../components/equipmentDetailScreen/EquipmentNotes.tsx";
import { EquipmentCalendar } from "../components/equipmentDetailScreen/EquipmentCalendar";
import FloatingButton from "../components/common/FloatingButton.tsx";
import {IoPencil} from "react-icons/io5";

function EquipmentDetailScreen() {
    const [equipment, setEquipment] = useState<Equipment | null>(null);
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [addedToCart, setAddedToCart] = useState(false);
    const { id } = useParams();
    const { addToCart, removeFromCart, cart } = useCart();

    const navigate = useNavigate();

    const handleClick = () => {
        if (!equipment) return;
        if (addedToCart) {
            removeFromCart(equipment.id);
            return;
        }
        addToCart(equipment);
        setAddedToCart(!addedToCart);
    };

    const handleEdit = () => {
        if (!equipment) return;
        navigate(`/ShelfTracker/equipment/edit/${equipment.id}`);
    };

    const handleDelete = async () => {
        if (!equipment) return;
        if (addedToCart) {
            removeFromCart(equipment.id);
            return;
        }
        await deleteEquipment(equipment.id);
        navigate("/ShelfTracker/");
    };

    useEffect(() => {
        const fetchEquipment = async () => {
            const eq = await getEquipmentById(Number(id));
            setEquipment(eq);
            setAddedToCart(cart.some((c) => c.id === eq?.id));
            setLoading(false);
        };

        const fetchBookings = async () => {
            const allBookings = await getAllBookings();
            setBookings(allBookings.filter((b) => b.equipment_id === Number(id)));
        };

        fetchEquipment();
        fetchBookings();
    }, [id, cart]);

    if (loading) {
        return (
            <div>
                <TopBar title="Détails" />
                <Loader />
            </div>
        );
    }

    if (!equipment) return null;

    return (
        <div>
            <TopBar title="Détails" />
            <EquipmentHeader
                equipment={equipment}
                addedToCart={addedToCart}
                onDelete={handleDelete}
                onToggleCart={handleClick}
            />
            <EquipmentNotes equipment={equipment} />
            <EquipmentQR equipment={equipment} />
            <FloatingButton icon={IoPencil}
                            color={"var(--tertiary-color)"}
                            onClick={handleEdit} />
            <EquipmentCalendar bookings={bookings} />
        </div>
    );
}

export default EquipmentDetailScreen;
