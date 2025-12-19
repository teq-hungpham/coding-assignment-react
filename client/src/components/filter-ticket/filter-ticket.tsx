import { Ticket } from "@acme/shared-models";
import styles from "./filter-ticket.module.css";

export type FilterType = "all" | "completed" | "incomplete";

export interface FilterTicketProps {
	filter: FilterType;
	onFilterChange: (filter: FilterType) => void;
}

function FilterTicket({ filter, onFilterChange }: FilterTicketProps) {
	return (
		<div className={styles["container"]}>
			<button
				onClick={() => onFilterChange("all")}
				className={filter === "all" ? styles["active"] : styles["button"]}
			>
				All
			</button>
			<button
				onClick={() => onFilterChange("incomplete")}
				className={
					filter === "incomplete" ? styles["active"] : styles["button"]
				}
			>
				Incomplete
			</button>
			<button
				onClick={() => onFilterChange("completed")}
				className={filter === "completed" ? styles["active"] : styles["button"]}
			>
				Completed
			</button>
		</div>
	);
}

export default FilterTicket;
