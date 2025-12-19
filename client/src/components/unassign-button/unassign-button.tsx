export interface UnassignButtonProps {
	onUnassign: () => void;
	disabled?: boolean;
}

function UnassignButton({ onUnassign, disabled = false }: UnassignButtonProps) {
	return (
		<button
			onClick={onUnassign}
			disabled={disabled}
			className="button secondary"
		>
			Unassign
		</button>
	);
}

export default UnassignButton;
