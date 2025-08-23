import { IoCubeOutline } from "react-icons/io5";
import "../../styles/EmptyState.css";

interface EmptyStateProps {
    message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
    return (
        <div className="empty-state">
            <IoCubeOutline size={64} className="empty-icon" />
            <p>{message ?? "Aucun élément trouvé."}</p>
        </div>
    );
};
