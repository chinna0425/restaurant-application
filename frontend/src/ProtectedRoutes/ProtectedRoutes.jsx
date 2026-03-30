import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = ({ allowedRoles }) => {
	const jwt = Cookies.get("jwt");
	const role = localStorage.getItem("role")?.trim();

	// Not logged in
	if (!jwt) {
		return <Navigate to="/account/login" replace />;
	}

	// Role not allowed
	if (allowedRoles && role && !allowedRoles.includes(role)) {
		return <Navigate to="/not-found" replace />;
	}

	// ✅ Allowed
	return <Outlet />;
};

export default ProtectedRoutes;
