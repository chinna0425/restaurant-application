import RestaurantCard from "../Restaurant/RestaurantCard";
import { useSelector } from "react-redux";
import "./shared.css";

const Favorites = () => {
	const auth = useSelector((store) => store.auth);

	return (
		<div>
			<h1 className="py-5 text-xl font-semibold text-center">My Favorites</h1>
			<div className="flex flex-wrap justify-center gap-4">
				{auth.favorites?.length > 0 ? (
					auth.favorites?.map((item, idx) => (
						<RestaurantCard key={idx} item={item} />
					))
				) : (
					<div className="home-data-notfound-container">
						<img
							src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?size=626&ext=jpg"
							alt="no-data"
							className="no-data-image"
							loading="lazy"
						/>

						<p className="text-gray-400 text-lg mt-5">
							No favorites found. Explore and add your favorite restaurants now!
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Favorites;
