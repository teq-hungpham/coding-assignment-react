import { User } from "@acme/shared-models";

export const usersService = {
	getAll: async (): Promise<User[]> => {
		const response = await fetch("/api/users");

		if (!response.ok) {
			throw new Error(`Error fetching users: ${response.status}`);
		}

		return response.json();
	},

	getById: async (id: number): Promise<User> => {
		const response = await fetch(`/api/users/${id}`);

		if (!response.ok) {
			throw new Error(`Error fetching user: ${response.status}`);
		}

		return response.json();
	},
};
