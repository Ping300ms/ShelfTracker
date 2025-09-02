import {useNavigate, useParams} from "react-router-dom";
import TopBar from "../components/common/TopBar.tsx";
import {deleteEquipment, getEquipmentById} from "../api/EquipmentsApi.ts";
import {useEffect, useState} from "react";
import type {Equipment} from "../types/Equipment.ts";
import "../styles/EquipmentDetail.css";
import {Loader} from "../components/common/Loader.tsx";
import {typeConfig} from "../utils/equipmentTypeConfig.ts";
import {IoAdd, IoRemove, IoTrashOutline} from "react-icons/io5";
import {useCart} from "../hooks/CartHook.ts";
import EquipmentQR from "../components/common/EquipmentQR.tsx";

function EquipmentDetailScreen() {
    const [equipment, setEquipment] = useState<Equipment | null>(null);
    const [loading, setLoading] = useState(true);
    const [addedToCard, setAddedToCart] = useState(false);
    const { id } = useParams();
    const { addToCart, removeFromCart, cart } = useCart();

    const navigate = useNavigate();

    const handleClick = () => {
        if (!equipment)
            return;

        if (addedToCard) {
            removeFromCart(equipment?.id);
            return;
        }
        addToCart(equipment);
        setAddedToCart(!addedToCard);
    }

    const handleDelete = async () => {
        if (!equipment)
            return;

        if (addedToCard) {
            removeFromCart(equipment?.id);
            return;
        }

        await deleteEquipment(equipment.id);
        navigate("/ShelfTracker/");
    }

    useEffect(() => {
        const getEquipment = async () => {
            const equipment = await getEquipmentById(Number(id));
            setEquipment(equipment);
            if (cart.find(eq => eq.id === equipment?.id)) {
                setAddedToCart(true);
            }
            else {
                setAddedToCart(false);
            }
            setLoading(false);

        }

        getEquipment();

    }, [id, cart]);


    if (loading) return (
        <div>
            <TopBar title="Détails"/>
            <Loader/>
        </div>
    );

    const type = equipment?.type ?? "Autre";
    const { icon: Icon, color } = typeConfig[type] || typeConfig["Autre"];

    return (
        <div>
            <TopBar title="Détails"/>
            <div className="equipment-detail-container">
                <div className="equipment-card-header">
                    <div className="equipment-detail-icon" style={{ background: color }}>
                        <Icon size={28} color="white" />
                    </div>
                    <h2 className="equipment-detail-name">{equipment?.name}</h2>
                    <button
                        className="equipment-detail-delete-btn"
                        onClick={handleDelete}
                    >
                        <IoTrashOutline className="equipment-detail-delete-icon" size={24} color="lightcoral" />
                    </button>
                    <button
                        className="equipment-detail-add-btn"
                        onClick={handleClick}
                    >
                        {addedToCard ? <IoRemove size={28} color="lightcoral" /> : <IoAdd size={28} color="lightgreen" />}
                    </button>
                </div>
                <p className="equipment-detail-type">{equipment?.type}</p>
                <p className="equipment-detail-location">
                    {equipment?.location == null
                    ? "Emplacement inconnu"
                    : equipment?.location}</p>
            </div>
            <div className="equipment-detail-note-container">
                <p className="equipment-detail-note">
                    {equipment?.note == null
                        ? "Cet equipement n'a pas de description."
                        : equipment?.note}
                </p>
            </div>

            {equipment && <EquipmentQR equipment={equipment} />}

        </div>
    );
}

export default EquipmentDetailScreen;