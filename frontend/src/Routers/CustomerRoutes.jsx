import { Navigate, Route, Routes } from "react-router-dom";
import RestaurantDetails from "../components/Restaurant/RestaurantDetails";
import Cart from "../components/Cart/Cart";
import Profile from "../components/Profile/Profile";
import Navbar from "../components/Navbar/Navbar";
import Home from "../components/Home/Home";
import Auth from "../components/Auth/Auth";
import PaymentSuccess from "../components/PaymentSuccess/PaymentSuccess";
import NotFound from "../components/NotFound/NotFound";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import AuthRoute from "../ProtectedRoutes/AuthRoute";
import RoleBasedRedirect from "../components/RoleBasedRedirect/RoleBasedRedirect";

const CustomerRoutes = () => {
	return (
		<div>
			<Routes>
				{/* NO NAVBAR */}
				<Route path="/not-found" element={<NotFound />} />

				{/* ALL OTHER ROUTES WITH NAVBAR */}
				<Route
					path="*"
					element={
						<>
							<Navbar />
							<Routes>
								<Route path="/" element={<RoleBasedRedirect />} />
								<Route
									path="/account/:type"
									element={
										<AuthRoute>
											<Home />
										</AuthRoute>
									}
								/>

								{/* PROTECTED */}
								<Route
									element={<ProtectedRoutes allowedRoles={["ROLE_CUSTOMER"]} />}
								>
									<Route path="/cart" element={<Cart />} />
									<Route
										path="/restaurant/:city/:title/:id"
										element={<RestaurantDetails />}
									/>
									<Route path="/my-profile/*" element={<Profile />} />
									<Route
										path="/payment/success/:id"
										element={<PaymentSuccess />}
									/>
								</Route>

								{/* FALLBACK */}
								<Route
									path="*"
									element={<Navigate to="/not-found" replace />}
								/>
							</Routes>
							<Auth />
						</>
					}
				/>
			</Routes>
		</div>
	);
};

export default CustomerRoutes;
