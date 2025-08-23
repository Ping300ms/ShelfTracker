import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {createBooking, getAllBookings} from "../api/BookingsApi";
import type { Equipment } from "../types/Equipment";
import { IoAlertCircleOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import TopBar from "../components/common/TopBar.tsx";
import "../styles/Checkout.css";
import {useCart} from "../hooks/CartHook.ts";
//import {useAuth} from "../hooks/AuthHook.ts";

function CheckoutScreen() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorItems, setErrorItems] = useState<Equipment[]>([]);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const {cart} = useCart();
    //const {user} = useAuth();

    const handleCheckout = async () => {
        if (!startDate || !endDate) {
            alert("Veuillez sélectionner une date de début et de fin.");
            return;
        }

        setLoading(true);
        setErrorItems([]);
        setSuccess(false);



        try {
            const conflicts: Equipment[] = [];

            const bookings = await getAllBookings();
            console.log(bookings);
            for (const eq of cart) {

                /*
                const conflictingBookings = bookings.filter((b) => b.equipment_id === eq.id
                                                                                  && b.start_time <= endDate
                                                                                  && b.end_time >= startDate);

                 */

                const conflictingBookings = bookings.filter((b) => b.equipment_id === eq.id);

                if (conflictingBookings.length > 0) {
                    conflicts.push(eq);
                }
            }

            if (conflicts.length > 0) {
                setErrorItems(conflicts);
                return;
            }

            for (const eq of cart) {
                await createBooking({
                    equipment_id: eq.id,
                    booker_id: 1,
                    rent: true,
                    start_time: startDate,
                    end_time: endDate,
                });
            }

            setSuccess(true);
        } catch (err) {
            console.error(err);
            alert("Une erreur est survenue lors de la réservation.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <TopBar title="Réservation" />
            <div className="checkout-container">
                <div className="date-selectors">
                    <label>
                        Début :
                        <input
                            type="datetime-local"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </label>

                    <label>
                        Fin :
                        <input
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </label>
                </div>

                <button className="btn" onClick={handleCheckout} disabled={loading}>
                    {loading ? "Réservation..." : "Réserver"}
                </button>

                {errorItems.length > 0 && (
                    <div className="error-box">
                        <IoAlertCircleOutline size={24} color="red" />
                        <p>Impossible de réserver les équipements suivants :</p>
                        <ul>
                            {errorItems.map((eq) => (
                                <li key={eq.id}>{eq.name}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {success && (
                    <div className="success-box">
                        <IoCheckmarkCircleOutline size={24} color="green" />
                        <p>Réservation confirmée 🎉</p>
                        <button onClick={() => navigate("/ShelfTracker")}>
                            Retour à l'accueil
                        </button>
                    </div>
                )}
            </div>
        </div>

    );
}

export default CheckoutScreen;
