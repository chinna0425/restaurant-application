import Home from "../Home/Home";
import { Navigate } from "react-router-dom";

const RoleBasedRedirect = () => {
	const role = localStorage.getItem("role");

	// If not logged in → allow home
	if (!role) {
		return <Home />;
	}

	// If admin/owner → redirect
	if (role === "ROLE_RESTAURANT_OWNER") {
		return <Navigate to="/admin/restaurants" replace />;
	}

	// Normal customer
	return <Home />;
};

export default RoleBasedRedirect;
