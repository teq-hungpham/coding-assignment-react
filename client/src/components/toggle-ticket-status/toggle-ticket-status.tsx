import styles from "./toggle-ticket-status.module.css";

export interface ToggleTicketStatusProps {
	completed: boolean;
	onToggle: () => void;
	disabled?: boolean;
}

function ToggleTicketStatus({
	completed,
	onToggle,
	disabled = false,
}: ToggleTicketStatusProps) {
	return (
		<button onClick={onToggle} disabled={disabled} className="button">
			{completed ? "Mark as Incomplete" : "Mark as Complete"}
		</button>
	);
}

export default ToggleTicketStatus;
