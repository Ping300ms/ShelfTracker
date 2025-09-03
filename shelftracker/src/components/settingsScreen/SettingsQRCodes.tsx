import type { User } from "@supabase/supabase-js";

interface QRCodesCardProps {
    user: User | null;
}

function SettingsQRCodes({ user }: QRCodesCardProps) {
    if (!user) return null;

    return (
        <div className="card">
            <h2>QR Codes</h2>
        </div>
    );
}

export default SettingsQRCodes;
