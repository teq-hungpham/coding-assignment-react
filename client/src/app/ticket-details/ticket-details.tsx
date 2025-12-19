import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Ticket } from "@acme/shared-models";
import styles from "./ticket-details.module.css";
import { useFetch } from "client/src/hooks/useFetch";
import { useMutation } from "client/src/hooks/useMutation";
import { ticketsService } from "client/src/services/tickets";
import Assignee from "client/src/components/ticket-list/assignee";
import AssigneeSelect from "client/src/components/assignee-select/assignee-select";
import UnassignButton from "client/src/components/unassign-button/unassign-button";
import ToggleTicketStatus from "client/src/components/toggle-ticket-status/toggle-ticket-status";

export function TicketDetails() {
	const { id } = useParams<{ id: string }>();
	const {
		data: ticket,
		fetch: fetchTicket,
		isLoading: ticketLoading,
		error: ticketError,
	} = useFetch<Ticket>({
		fetchFn: () => ticketsService.getById(Number(id)),
	});

	const { mutate: assignTicket, isLoading: assigning } = useMutation<
		void,
		{ ticketId: number; userId: number }
	>({
		mutationFn: ({ ticketId, userId }) =>
			ticketsService.assign(ticketId, userId),
	});

	const { mutate: unassignTicket, isLoading: unassigning } = useMutation<
		void,
		number
	>({
		mutationFn: (ticketId) => ticketsService.unassign(ticketId),
	});

	const { mutate: toggleComplete, isLoading: toggling } = useMutation<
		void,
		{ ticketId: number; completed: boolean }
	>({
		mutationFn: ({ ticketId, completed }) =>
			ticketsService.toggleComplete(ticketId, completed),
	});

	const isAnyActionLoading = assigning || unassigning || toggling;

	useEffect(() => {
		fetchTicket();
	}, [id]);

	const handleAssign = async (userId: number) => {
		if (ticket) {
			await assignTicket({ ticketId: ticket.id, userId });
			fetchTicket();
		}
	};

	const handleUnassign = async () => {
		if (ticket) {
			await unassignTicket(ticket.id);
			fetchTicket();
		}
	};

	const handleToggleComplete = async () => {
		if (ticket) {
			await toggleComplete({
				ticketId: ticket.id,
				completed: !ticket.completed,
			});
			fetchTicket();
		}
	};

	if (ticketLoading) {
		return <div>Loading...</div>;
	}

	if (ticketError) {
		return <div className="error">{ticketError.message}</div>;
	}

	if (!ticket) {
		return <div>404</div>;
	}

	return (
		<div className={styles["container"]}>
			<div className={styles["header"]}>
				<h1>Ticket #{ticket.id}</h1>
				<span
					className={`${styles["status"]} ${
						ticket.completed ? styles["completed"] : styles["incomplete"]
					}`}
				>
					{ticket.completed ? "Completed" : "Incomplete"}
				</span>
			</div>

			<h2>Description</h2>
			<p>{ticket.description}</p>

			<div className={styles["assignee-container"]}>
				<h2>Assignee:</h2>
				<Assignee assigneeId={ticket.assigneeId} />

				{ticket.assigneeId && (
					<UnassignButton
						onUnassign={handleUnassign}
						disabled={isAnyActionLoading}
					/>
				)}
			</div>

			<h2>Assign to:</h2>
			<AssigneeSelect
				currentAssigneeId={ticket.assigneeId}
				onAssign={handleAssign}
				disabled={isAnyActionLoading}
			/>

			<h2>Status</h2>
			<ToggleTicketStatus
				completed={ticket.completed}
				onToggle={handleToggleComplete}
				disabled={isAnyActionLoading}
			/>
		</div>
	);
}

export default TicketDetails;
