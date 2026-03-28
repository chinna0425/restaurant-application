import RestaurantCard from "../Restaurant/RestaurantCard";
import { useSelector } from "react-redux";

const Favorites = () => {
	const auth = useSelector((store) => store.auth);

	return (
		<div>
			<h1 className="py-5 text-xl font-semibold text-center">My Favorites</h1>
			<div className="flex flex-wrap justify-center gap-4">
				{auth.favorites?.map((item, idx) => (
					<RestaurantCard key={idx} item={item} />
				))}
			</div>
		</div>
	);
};

export default Favorites;
