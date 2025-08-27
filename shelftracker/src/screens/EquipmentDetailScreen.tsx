import { useParams } from "react-router-dom";
import TopBar from "../components/common/TopBar.tsx";
import {getEquipmentById} from "../api/EquipmentsApi.ts";
import {useEffect, useState} from "react";
import type {Equipment} from "../types/Equipment.ts";
import "../styles/EquipmentDetail.css";
import {Loader} from "../components/common/Loader.tsx";


function EquipmentDetailScreen() {
    const [equipment, setEquipment] = useState<Equipment | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // récupère l'id depuis l'URL

    useEffect(() => {
        const getEquipment = async () => {
            const equipment = await getEquipmentById(Number(id));
            setEquipment(equipment)
            setLoading(false)
        }

        getEquipment();

    }, [id]);

    if (loading) return (
        <div>
            <TopBar title="Détails"/>
            <Loader/>
        </div>
    );

    return (
        <div>
            <TopBar title="Détails"/>
            <div className="equipment-detail-container">
                <h2>{equipment?.name}</h2>
                <h2>{equipment?.type}</h2>
                <h2>{equipment?.note}</h2>
                <h2>{equipment?.location}</h2>
                <h2>{equipment?.rent_price}</h2>
            </div>
        </div>

    );
}

export default EquipmentDetailScreen;