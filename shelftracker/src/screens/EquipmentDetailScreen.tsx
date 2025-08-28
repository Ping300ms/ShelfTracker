import { useParams } from "react-router-dom";
import TopBar from "../components/common/TopBar.tsx";
import {getEquipmentById} from "../api/EquipmentsApi.ts";
import {useEffect, useState} from "react";
import type {Equipment} from "../types/Equipment.ts";
import "../styles/EquipmentDetail.css";
import {Loader} from "../components/common/Loader.tsx";
import {typeConfig} from "../utils/equipmentTypeConfig.ts";

function EquipmentDetailScreen() {
    const [equipment, setEquipment] = useState<Equipment | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const getEquipment = async () => {
            const equipment = await getEquipmentById(Number(id));
            setEquipment(equipment);
            console.log(equipment);

            setLoading(false);

        }

        getEquipment();

    }, [id]);

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
        </div>
    );
}

export default EquipmentDetailScreen;