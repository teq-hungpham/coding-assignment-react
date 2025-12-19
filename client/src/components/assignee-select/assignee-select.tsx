import { User } from "@acme/shared-models";
import { useEffect, useState } from "react";
import styles from "./assignee-select.module.css";
import { usersService } from "client/src/services/users";
import { useFetch } from "client/src/hooks/useFetch";

export interface AssigneeSelectProps {
	currentAssigneeId: number | null;
	onAssign: (userId: number) => void;
	disabled?: boolean;
}

function AssigneeSelect({
	onAssign,
	currentAssigneeId,
	disabled = false,
}: AssigneeSelectProps) {
	const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
	const {
		data: users,
		fetch: fetchUsers,
		isLoading: usersLoading,
		error,
	} = useFetch<User[]>({
		fetchFn: usersService.getAll,
	});

	const filteredUsers = users?.filter((user) => user.id !== currentAssigneeId);

	const handleAssign = () => {
		if (selectedUserId) {
			onAssign(selectedUserId);
			setSelectedUserId(null);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<div className={styles["container"]}>
			<select
				value={selectedUserId || ""}
				onChange={(e) =>
					setSelectedUserId(e.target.value ? Number(e.target.value) : null)
				}
				className={styles["select"]}
				disabled={disabled || usersLoading}
			>
				<option value="">Select user...</option>
				{filteredUsers?.map((user) => (
					<option key={user.id} value={user.id}>
						{user.name}
					</option>
				))}
			</select>
			<button
				onClick={handleAssign}
				disabled={disabled || !selectedUserId}
				className="button"
			>
				Assign
			</button>
			{error && <div className="error">{error.message}</div>}
		</div>
	);
}

export default AssigneeSelect;
