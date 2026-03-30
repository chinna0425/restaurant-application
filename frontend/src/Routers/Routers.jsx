import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import CustomerRoutes from "./CustomerRoutes";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";

const Routers = () => {
	return (
		<Routes>
			{/* ADMIN PROTECTED */}
			<Route
				element={<ProtectedRoutes allowedRoles={["ROLE_RESTAURANT_OWNER"]} />}
			>
				<Route path="/admin/restaurants/*" element={<AdminRoutes />} />
			</Route>

			{/* CUSTOMER */}
			<Route path="/*" element={<CustomerRoutes />} />
		</Routes>
	);
};

export default Routers;
