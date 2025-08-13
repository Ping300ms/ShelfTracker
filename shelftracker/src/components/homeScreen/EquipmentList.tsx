import { useEffect, useState } from 'react';
import { getEquipments } from '../../api/EquipmentsApi.ts';
import type { Equipment } from '../../types/Equipment.ts';

export const EquipmentList = () => {
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEquipments();
                setEquipments(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erreur inconnue');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (equipments.length === 0) return <p>Aucun équipement trouvé.</p>;

    return (
        <div>
            <h2>Liste des équipements</h2>
            <ul>
                {equipments.map(eq => (
                    <li key={eq.id}>
                        <strong>{eq.name}</strong> — {eq.location ?? 'Emplacement inconnu'}
                    </li>
                ))}
            </ul>
        </div>
    );
};
