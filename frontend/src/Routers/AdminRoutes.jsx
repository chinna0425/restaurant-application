import { Route, Routes } from "react-router-dom";
import CreateRestaurantForm from "../AdminComponent/CreateRestaurantForm/CreateRestaurantForm";
import Admin from "../AdminComponent/Admin/Admin";

const AdminRoutes = () => {
	const restaurant = useSelector((store) => store.restaurant);
	const { isRestaurantLoaded } = restaurant;
	console.log("AdminRoutes", isRestaurantLoaded);
	if (!isRestaurantLoaded) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="loader h-32 w-32">Loading...</div>
			</div>
		);
	}

	return (
		<div>
			<Routes>
				<Route
					path="/*"
					element={
						restaurant.usersRestaurant === null ? (
							<CreateRestaurantForm />
						) : (
							<Admin />
						)
					}
				></Route>
			</Routes>
		</div>
	);
};

export default AdminRoutes;
