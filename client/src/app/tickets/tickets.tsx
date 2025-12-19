import { Ticket } from "@acme/shared-models";
import styles from "./tickets.module.css";
import TicketList from "client/src/components/ticket-list/ticket-list";
import { ticketsService } from "client/src/services/tickets";
import { useFetch } from "client/src/hooks/useFetch";
import { useEffect, useMemo, useState } from "react";
import CreateTicket from "client/src/components/create-ticket/create-ticket";
import FilterTicket, {
	FilterType,
} from "client/src/components/filter-ticket/filter-ticket";

export function Tickets() {
	const [filter, setFilter] = useState<FilterType>("all");
	const {
		data: tickets,
		isLoading,
		error,
		fetch,
	} = useFetch<Ticket[]>({
		fetchFn: ticketsService.getAll,
	});

	const flteredTickets = useMemo(() => {
		return tickets?.filter((ticket) => {
			if (filter === "all") return true;
			if (filter === "completed") return ticket.completed;
			if (filter === "incomplete") return !ticket.completed;
			return true;
		});
	}, [tickets, filter]);

	useEffect(() => {
		fetch();
	}, []);

	return (
		<div className={styles["tickets"]}>
			<h2>Tickets</h2>
			<CreateTicket onCreated={() => fetch()} />
			<FilterTicket filter={filter} onFilterChange={setFilter} />
			<TicketList
				tickets={flteredTickets || []}
				isLoading={isLoading}
				error={error}
			/>
		</div>
	);
}

export default Tickets;
