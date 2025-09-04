// @ts-expect-error false import error
import { dateFnsLocalizer } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fr } from "date-fns/locale";

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // lundi
    getDay,
    locales: { fr },
});
