import { useAuth } from "../hooks/AuthHook.ts";
import TopBar from "../components/common/TopBar.tsx";
import SettingsProfile from "../components/settingsScreen/SettingsProfile.tsx";
import SettingsQRCodes from "../components/settingsScreen/SettingsQRCodes.tsx";
import {useEffect, useState} from "react";
import type {Booking} from "../types/Booking.ts";
import {getAllBookings} from "../api/BookingsApi.ts";
import {BookingCalendar} from "../components/common/BookingCalendar.tsx";

function SettingsScreen() {
    const { user, signOut } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {

        const fetchBookings = async () => {
            const allBookings = await getAllBookings();
            setBookings(allBookings);
        };

        fetchBookings();
    }, []);

    return (
        <div>
            <TopBar title="Paramètres" />

            <SettingsProfile user={user} onSignOut={signOut} />
            <SettingsQRCodes user={user}/>
            <BookingCalendar bookings={bookings}/>
        </div>
    );
}

export default SettingsScreen;
