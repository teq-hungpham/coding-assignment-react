import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Ticket } from "@acme/shared-models";
import Tickets from "./tickets";
import { ticketsService } from "client/src/services/tickets";

jest.mock("client/src/services/tickets");

const mockTickets: Ticket[] = [
	{ id: 1, description: "Ticket 1", assigneeId: null, completed: true },
	{ id: 2, description: "Ticket 2", assigneeId: null, completed: true },
	{ id: 3, description: "Ticket 3", assigneeId: null, completed: false },
];

describe("Tickets", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(ticketsService.getAll as jest.Mock).mockResolvedValue(mockTickets);
	});

	it("should render successfully", async () => {
		await act(async () => {
			const { baseElement } = render(
				<BrowserRouter>
					<Tickets />
				</BrowserRouter>,
			);
			expect(baseElement).toBeTruthy();
		});
	});

	it("should display the heading", async () => {
		await act(async () => {
			render(
				<BrowserRouter>
					<Tickets />
				</BrowserRouter>,
			);
		});

		expect(screen.getByText("Tickets")).toBeInTheDocument();
	});

	it("should display 3 tickets after fetching", async () => {
		await act(async () => {
			render(
				<BrowserRouter>
					<Tickets />
				</BrowserRouter>,
			);
		});

		expect(screen.getByText("Ticket 1")).toBeInTheDocument();
		expect(screen.getByText("Ticket 2")).toBeInTheDocument();
		expect(screen.getByText("Ticket 3")).toBeInTheDocument();
	});

	it("should display 1 tickets after click 'incomplete' button", async () => {
		const user = userEvent.setup();

		await act(async () => {
			render(
				<BrowserRouter>
					<Tickets />
				</BrowserRouter>,
			);
		});

		const incompleteButton = screen.getByRole("button", {
			name: /incomplete/i,
		});
		await user.click(incompleteButton);

		expect(screen.queryByText("Ticket 1")).not.toBeInTheDocument();
		expect(screen.queryByText("Ticket 2")).not.toBeInTheDocument();
		expect(screen.getByText("Ticket 3")).toBeInTheDocument();
	});
});
