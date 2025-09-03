import type {Equipment} from "../../types/Equipment";
import { IoAlertCircleOutline } from "react-icons/io5";

interface ErrorBoxProps {
    errorItems: Equipment[];
}

export function ErrorBox({ errorItems }: ErrorBoxProps) {
    if (errorItems.length === 0) return null;

    return (
        <div className="error-box">
        <IoAlertCircleOutline size={24} color="red" />
        <p>Impossible de réserver les équipements suivants :</p>
    <ul>
    {errorItems.map((eq) => (
            <li key={eq.id}>{eq.name}</li>
        ))}
    </ul>
    </div>
);
}
