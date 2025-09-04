import type { Profile } from "../../types/Profile";
import { ProfileSelector } from "./ProfileSelector";
import { DateRangePicker } from "./DateRangePicker";

interface CheckoutFormProps {
    profiles: Profile[];
    selectedProfile: string | "";
    onProfileChange: (value: string | "create") => void;

    startDate: string;
    endDate: string;
    minDate: string;
    onStartChange: (value: string) => void;
    onEndChange: (value: string) => void;

    loading: boolean;
    onCheckout: () => void;
}

export function CheckoutForm({
                                 profiles,
                                 selectedProfile,
                                 onProfileChange,
                                 startDate,
                                 endDate,
                                 minDate,
                                 onStartChange,
                                 onEndChange,
                                 loading,
                                 onCheckout,
                             }: CheckoutFormProps) {
    return (
        <div className="card">
            <ProfileSelector
                profiles={profiles}
                selectedProfile={selectedProfile}
                onChange={onProfileChange}
            />

            <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                minDate={minDate}
                onStartChange={onStartChange}
                onEndChange={onEndChange}
            />

            <button className="btn" onClick={onCheckout} disabled={loading}>
                {loading ? "Réservation..." : "Réserver"}
            </button>
        </div>
    );
}
