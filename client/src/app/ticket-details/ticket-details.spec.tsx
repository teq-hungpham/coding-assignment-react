import { render } from "@testing-library/react";

import TicketDetails from "./ticket-details";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

describe("TicketDetails", () => {
	it("should render successfully", async () => {
		await act(async () => {
			const { baseElement } = render(
				<BrowserRouter>
					<TicketDetails />
				</BrowserRouter>,
			);
			expect(baseElement).toBeTruthy();
		});
	});
});
