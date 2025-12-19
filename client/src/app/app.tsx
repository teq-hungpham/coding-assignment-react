import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Ticket, User } from "@acme/shared-models";

import styles from "./app.module.css";
import Tickets from "./tickets/tickets";
import TicketDetails from "client/src/app/ticket-details/ticket-details";

const App = () => {
	return (
		<div className={styles["app"]}>
			<h1>Ticketing App</h1>
			<Routes>
				<Route path="/" element={<Tickets />} />
				{/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
				<Route path="/:id" element={<TicketDetails />} />
			</Routes>
		</div>
	);
};

export default App;
