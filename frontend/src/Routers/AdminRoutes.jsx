import { Route, Routes } from "react-router-dom";
import CreateRestaurantForm from "../AdminComponent/CreateRestaurantForm/CreateRestaurantForm";
import Admin from "../AdminComponent/Admin/Admin";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
	const { restaurant } = useSelector((store) => store);

	return (
		<div>
			<Routes>
				<Route
					path="/*"
					element={
						!restaurant?.usersRestaurant ? <CreateRestaurantForm /> : <Admin />
					}
				></Route>
			</Routes>
		</div>
	);
};

export default AdminRoutes;
