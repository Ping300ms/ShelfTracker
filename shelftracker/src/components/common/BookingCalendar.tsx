// @ts-expect-error false import error
import { Calendar, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer } from "../../utils/calendar";
import type { Booking } from "../../types/Booking";
import "./BookingCalendar.css";

export function BookingCalendar({ bookings }: { bookings: Booking[] }) {
    const events = bookings.map((b) => ({
        id: b.id,
        title: `${b.equipment.name} ${b.rent ? "loué" : "réservé"} par ${b.booker.name}`,
        start: new Date(b.start_time),
        end: new Date(b.end_time),
    }));

    return (
        <div className="card">
            <div className="booking-calendar__container">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView={Views.MONTH}
                    className="booking-calendar__calendar"
                />
            </div>
        </div>

    );
}
