import { useDispatch, useSelector } from "react-redux";
import RestaurantCard from "../Restaurant/RestaurantCard";
import "./Home.css";
import MultiItemCarousal from "./MultiItemCarousal";
import { useEffect } from "react";
import { getAllRestaurantsAction } from "../../StateMangement/Restaurant/Action";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Home = () => {
	const dispatch = useDispatch();
	const jwt = Cookies.get("jwt");
	const navigate = useNavigate();

	useEffect(() => {
		if (jwt) {
			dispatch(getAllRestaurantsAction(jwt));
		}
	}, [jwt]);

	const restaurant = useSelector((store) => store.restaurant);
	const auth = useSelector((store) => store.auth);
	// console.log("Home restaurant", restaurant);

	return (
		<div className="pb-10">
			<section className="banner -z-50 relative flex flex-col justify-center items-center">
				<div className="w-[50vw] z-10 text-center">
					<p className="text-2xl lg:text-6xl font-bold z-10 py-5">
						Tasty Kitchens
					</p>
					<p className="z-10 text-gray-300 text-xl lg:text-4xl">
						Taste the Convenience: Food, Fast and Delivered.
					</p>
				</div>
				<div className="cover absolute top-0 left-0 right-0"></div>
				<div className="fadout"></div>
			</section>
			<section className="p-10 lg:py-10 lg:px-20">
				<p className="text-2xl font-semibold text-gray-400 py-3 pb-10">
					Top Meals
				</p>
				<MultiItemCarousal />
			</section>
			<section className="px-5 lg:px-20 pt-10">
				<h1 className="text-2xl font-semibold text-gray-400 pb-8">
					Order From Our Handpicked Favourites
				</h1>

				{!auth.user ? (
					<div className="flex flex-col items-center justify-center h-[60vh] text-center">
						<img
							src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?size=626&ext=jpg"
							alt="no-data"
							className="w-72 mb-5"
							loading="lazy"
						/>

						<p className="text-gray-400 text-lg">
							Please log in to view your favorite restaurants.
						</p>

						<Button
							variant="contained"
							sx={{ marginTop: "20px" }}
							onClick={() => navigate("/account/login")}
						>
							Login
						</Button>
					</div>
				) : restaurant.restaurants?.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-[60vh] text-center">
						<img
							src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?size=626&ext=jpg"
							alt="no-data"
							className="w-72 mb-5"
							loading="lazy"
						/>

						<p className="text-gray-400 text-lg">
							No restaurants found. Check back later for updates!
							<br />
							Meanwhile, explore our delicious meals and discover your new
							favorites!
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
						{restaurant.restaurants.map((item, index) => (
							<RestaurantCard key={index} item={item} />
						))}
					</div>
				)}
			</section>
		</div>
	);
};
export default Home;
