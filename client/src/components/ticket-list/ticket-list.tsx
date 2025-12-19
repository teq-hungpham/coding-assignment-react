import { Ticket } from "@acme/shared-models";
import styles from "./ticket-list.module.css";
import { Link } from "react-router-dom";
import Assignee from "client/src/components/ticket-list/assignee";

export interface TicketListProps {
	tickets: Ticket[];
	isLoading?: boolean;
	error: Error | null;
}

function TicketList({ tickets, isLoading, error }: TicketListProps) {
	if (error) {
		return <div className={styles["error"]}>{error.message}</div>;
	}

	if (tickets.length === 0) {
		return <p>No tickets found.</p>;
	}

	return (
		<ul className={styles["list"]}>
			{tickets.map((ticket) => (
				<li key={ticket.id} className={styles["item"]}>
					<Link to={`/${ticket.id}`} className={styles["link"]}>
						<div className={styles["content"]}>
							<span className={styles["id"]}>#{ticket.id}</span>
							<span className={styles["description"]}>
								{ticket.description}
							</span>
							<span
								className={`${styles["status"]} ${
									ticket.completed ? styles["completed"] : styles["incomplete"]
								}`}
							>
								{ticket.completed ? "Completed" : "Incomplete"}
							</span>
						</div>
						<Assignee assigneeId={ticket.assigneeId} />
					</Link>
				</li>
			))}
		</ul>
	);
}

export default TicketList;
