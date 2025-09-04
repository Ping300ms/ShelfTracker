import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking, getActiveBookings } from "../api/BookingsApi";
import { getProfiles } from "../api/ProfilesApi";
import type { Equipment } from "../types/Equipment";
import type { Profile } from "../types/Profile";
import TopBar from "../components/common/TopBar.tsx";
import { useCart } from "../hooks/CartHook.ts";

import { ErrorBox } from "../components/checkoutScreen/ErrorBox";
import { SuccessBox } from "../components/checkoutScreen/SuccessBox";
import { CheckoutForm } from "../components/checkoutScreen/CheckoutForm";

function CheckoutScreen() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorItems, setErrorItems] = useState<Equipment[]>([]);
    const [success, setSuccess] = useState(false);

    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [selectedProfile, setSelectedProfile] = useState<string | "">("");

    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const data = await getProfiles();
                setProfiles(data);
                if (data.length > 0) setSelectedProfile(data[0].id);
            } catch (err) {
                console.error("Erreur chargement profils", err);
            }
        };
        void fetchProfiles();
    }, []);

    const handleCheckout = async () => {
        if (!startDate || !endDate) {
            alert("Veuillez sélectionner une date de début et de fin.");
            return;
        }
        if (!selectedProfile) {
            alert("Veuillez sélectionner un profil.");
            return;
        }

        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start < now || end < now) {
            alert("Les dates doivent être dans le futur.");
            return;
        }
        if (start >= end) {
            alert("La date de début doit être avant la date de fin.");
            return;
        }

        setLoading(true);
        setErrorItems([]);
        setSuccess(false);

        try {
            const conflicts: Equipment[] = [];
            const bookings = await getActiveBookings();
            const profile = profiles.find((p) => p.id === selectedProfile);
            if (!profile) throw new Error("Unexpected profile selected");

            for (const eq of cart) {
                const conflictingBookings = bookings.filter(
                    (b) =>
                        b.equipment === eq &&
                        new Date(b.start_time) <= end &&
                        new Date(b.end_time) >= start
                );
                if (conflictingBookings.length > 0) conflicts.push(eq);
            }

            if (conflicts.length > 0) {
                setErrorItems(conflicts);
                return;
            }

            for (const eq of cart) {
                await createBooking({
                    equipment: eq,
                    booker: profile,
                    rent: true,
                    start_time: start.toISOString(),
                    end_time: end.toISOString(),
                });
            }

            clearCart();
            setSuccess(true);
        } catch (err) {
            console.error(err);
            alert("Une erreur est survenue lors de la réservation.");
        } finally {
            setLoading(false);
        }
    };

    const minDate = new Date().toISOString().slice(0, 16);

    return (
        <div>
            <TopBar title="Réservation" />

            <CheckoutForm
                profiles={profiles}
                selectedProfile={selectedProfile}
                onProfileChange={(value) =>
                    value === "create"
                        ? navigate("/create-profile")
                        : setSelectedProfile(value)
                }
                startDate={startDate}
                endDate={endDate}
                minDate={minDate}
                onStartChange={setStartDate}
                onEndChange={setEndDate}
                loading={loading}
                onCheckout={handleCheckout}
            />

            <ErrorBox errorItems={errorItems} />
            {success && <SuccessBox />}
        </div>
    );
}

export default CheckoutScreen;
