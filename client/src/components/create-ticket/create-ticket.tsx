import { Ticket } from "@acme/shared-models";
import { FormEvent, useState } from "react";
import styles from "./create-ticket.module.css";
import { ticketsService } from "client/src/services/tickets";
import { useMutation } from "client/src/hooks/useMutation";

export interface CreateTicketProps {
	onCreated: (createdTicket: Ticket) => void;
}

function CreateTicket({ onCreated }: CreateTicketProps) {
	const [description, setDescription] = useState("");
	const { mutate, isLoading, error } = useMutation<Ticket, string>({
		mutationFn: (description) => ticketsService.create(description),
	});

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const trimmedDescription = description.trim();

		if (!trimmedDescription) return;

		const newTicket = await mutate(trimmedDescription);

		if (newTicket) {
			setDescription("");
			onCreated(newTicket);
		}
	};

	return (
		<div className={styles["container"]}>
			{error && <div className="error">{error.message}</div>}
			<form onSubmit={handleSubmit} className={styles["form"]}>
				<input
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					disabled={isLoading}
					className={styles["input"]}
				/>
				<button disabled={isLoading || !description.trim()} className="button">
					{isLoading ? "Creating..." : "Add"}
				</button>
			</form>
		</div>
	);
}

export default CreateTicket;
