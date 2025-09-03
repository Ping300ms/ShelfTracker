// @ts-ignore
import { Calendar, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer } from "../../utils/calendar";
import type { Booking } from "../../types/Booking";

export function EquipmentCalendar({ bookings }: { bookings: Booking[] }) {
    const events = bookings.map((b) => ({
        id: b.id,
        title: b.rent ? "Loué" : "Réservé",
        start: new Date(b.start_time),
        end: new Date(b.end_time),
    }));

    return (
        <div className="equipment-calendar-container">
            <h3>Réservations</h3>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView={Views.MONTH}
                style={{ height: 500, margin: "20px" }}
            />
        </div>
    );
}
