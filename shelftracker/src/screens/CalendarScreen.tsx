import {useEffect, useState} from "react";
import {getAllBookings} from "../api/BookingsApi.ts";
import type {Booking} from "../types/Booking.ts";
import {BookingCalendar} from "../components/common/BookingCalendar.tsx";
import TopBar from "../components/common/TopBar.tsx";

function CalendarScreen() {
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
            <TopBar title="Calendrier des réservations"/>
            <BookingCalendar bookings={bookings}/>
        </div>
    );
}
export default CalendarScreen;