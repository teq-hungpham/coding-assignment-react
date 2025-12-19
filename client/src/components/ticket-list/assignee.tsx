import { User } from "@acme/shared-models";
import { useEffect } from "react";
import styles from "./ticket-list.module.css";
import { useFetch } from "client/src/hooks/useFetch";
import { usersService } from "client/src/services/users";

export interface AssigneeProps {
	assigneeId: number | null;
}

function Assignee({ assigneeId }: AssigneeProps) {
	const {
		data: user,
		fetch,
		isLoading,
		error,
	} = useFetch<User>({
		fetchFn: () => usersService.getById(assigneeId!),
	});

	useEffect(() => {
		if (assigneeId) {
			fetch();
		}
	}, [assigneeId]);

	if (!assigneeId) {
		return <div className={styles["description"]}>Unassigned</div>;
	}

	if (isLoading) {
		return <div className={styles["description"]}>...</div>;
	}

	if (error) {
		return <div className={styles["description"]}>Unknown</div>;
	}

	return <h3 className={styles["description"]}>{user?.name ?? assigneeId}</h3>;
}

export default Assignee;
