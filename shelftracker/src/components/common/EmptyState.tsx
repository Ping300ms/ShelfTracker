import { IoCubeOutline } from "react-icons/io5";
import "./EmptyState.css";

interface EmptyStateProps {
    message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
    return (
        <div className="empty-state__container">
            <IoCubeOutline size={64} className="empty-state__icon" />
            <p>{message ?? "Aucun élément trouvé."}</p>
        </div>
    );
};
