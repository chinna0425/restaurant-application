import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthRoute = ({ children }) => {
	const jwt = Cookies.get("jwt");
	const role = localStorage.getItem("role")?.trim();

	// If already logged in → redirect
	if (jwt) {
		if (role === "ROLE_CUSTOMER") {
			return <Navigate to="/" replace />;
		}

		if (role === "ROLE_RESTAURANT_OWNER") {
			return <Navigate to="/admin/restaurants" replace />;
		}
	}

	// Not logged in → allow access
	return children;
};

export default AuthRoute;
