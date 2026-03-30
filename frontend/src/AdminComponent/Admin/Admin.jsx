import Events from "../Events/Events";
import FoodCategory from "../FoodCategory/FoodCategory";
import Ingredients from "../Ingredients/Ingredients";
import Menu from "../Menu/Menu";
import Orders from "../Orders/Orders";
import AdminSideBar from "./AdminSideBar";
import { Navigate, Route, Routes } from "react-router-dom";
import RestaurantDetails from "./RestaurantDetails";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import CreateMenuForm from "../Menu/CreateMenuForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRestaurantsCategory } from "../../StateMangement/Restaurant/Action";
import { fetchRestaurantsOrder } from "../../StateMangement/RestaurantOrder/Action";
import Cookies from "js-cookie";
import NotFound from "../../components/NotFound/NotFound";
const Admin = () => {
	const dispatch = useDispatch();
	const restaurant = useSelector((store) => store.restaurant);
	const jwt = Cookies.get("jwt");
	const handleClose = () => {};

	useEffect(() => {
		dispatch(
			getRestaurantsCategory({
				jwt,
				restaurantId: restaurant.usersRestaurant?.id,
			}),
		);
		dispatch(
			fetchRestaurantsOrder({
				restaurantId: restaurant.usersRestaurant?.id,
				jwt,
			}),
		);
	}, []);

	return (
		<div>
			<div className="lg:flex justify-between">
				<div>
					<AdminSideBar handleClose={handleClose} />
				</div>
				<div className="lg:w-[80%]">
					<Routes>
						<Route index element={<AdminDashboard />}></Route>
						<Route path="orders" element={<Orders />}></Route>
						<Route path="menu" element={<Menu />}></Route>
						<Route path="food-category" element={<FoodCategory />}></Route>
						<Route path="ingredients" element={<Ingredients />}></Route>
						<Route path="event" element={<Events />}></Route>
						<Route path="details" element={<RestaurantDetails />}></Route>
						<Route path="add-food" element={<CreateMenuForm />}></Route>
						<Route path="/not-found" element={<NotFound />} />
						<Route path="*" element={<Navigate replace to="/not-found" />} />
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default Admin;
