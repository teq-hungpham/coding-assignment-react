import { Ticket } from "@acme/shared-models";

export const ticketsService = {
	getAll: async (): Promise<Ticket[]> => {
		const response = await fetch("/api/tickets");

		if (!response.ok) {
			throw new Error(`Error fetching tickets: ${response.status}`);
		}

		return response.json();
	},

	getById: async (id: number): Promise<Ticket> => {
		const response = await fetch(`/api/tickets/${id}`);
		if (!response.ok) {
			throw new Error(`Error fetching ticket: ${response.status}`);
		}

		return response.json();
	},

	create: async (description: string): Promise<Ticket> => {
		const response = await fetch("/api/tickets", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ description }),
		});
		if (!response.ok) {
			throw new Error(`Error creating ticket: ${response.status}`);
		}

		return response.json();
	},

	assign: async (ticketId: number, userId: number): Promise<void> => {
		const response = await fetch(`/api/tickets/${ticketId}/assign/${userId}`, {
			method: "PUT",
		});

		if (!response.ok) {
			throw new Error(`Error assigning ticket: ${response.status}`);
		}
	},

	unassign: async (ticketId: number): Promise<void> => {
		const response = await fetch(`/api/tickets/${ticketId}/unassign`, {
			method: "PUT",
		});
		if (!response.ok) {
			throw new Error(`Error unassigning ticket: ${response.status}`);
		}
	},

	toggleComplete: async (
		ticketId: number,
		completed: boolean,
	): Promise<void> => {
		const method = completed ? "PUT" : "DELETE";
		const response = await fetch(`/api/tickets/${ticketId}/complete`, {
			method,
		});

		if (!response.ok) {
			throw new Error(`Error updating ticket status: ${response.status}`);
		}
	},
};
