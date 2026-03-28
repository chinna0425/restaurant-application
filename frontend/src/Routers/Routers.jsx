import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import CustomerRoutes from "./CustomerRoutes";

const Routers = () => {
	return (
		<Routes>
			<Route path="/admin/restaurants/*" element={<AdminRoutes />}></Route>
			<Route path="/*" element={<CustomerRoutes />}></Route>
		</Routes>
	);
};

export default Routers;
