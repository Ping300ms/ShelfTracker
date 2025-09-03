import type {Equipment} from "../../types/Equipment";
import {IoAlertCircleOutline} from "react-icons/io5";
import "./ErrorBox.css";

interface ErrorBoxProps {
    errorItems: Equipment[];
}

export function ErrorBox({ errorItems }: ErrorBoxProps) {
    if (errorItems.length === 0) return null;

    return (
        <div className="card" style={{ backgroundColor: "var(--secondary-error-color)" }}>
            <div className="error-box__content">
                <IoAlertCircleOutline size={24} color="red" />
                <p>Impossible de réserver les équipements suivants :</p>
            </div>
            <ul className="error-box__list">
                {errorItems.map((eq) => (
                    <li key={eq.id}>{eq.name}</li>
                ))}
            </ul>
        </div>
    );


}
