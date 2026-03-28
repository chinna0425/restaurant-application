import { Card, Chip, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../../StateMangement/Authentication/Action";
import { isPresentInFavorites } from "../config/logic";
import Cookies from "js-cookie";

const RestaurantCard = ({ item }) => {
	// console.log("Each restaurant", item);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const jwt = Cookies.get("jwt");
	const auth = useSelector((store) => store.auth);

	const handleAddToFavorite = () => {
		dispatch(addToFavorite({ restaurantId: item.id, jwt }));
	};

	const handleNavigateToRestaurant = () => {
		if (item.open) {
			navigate(`/restaurant/${item.address?.city}/${item.name}/${item.id}`);
		}
	};

	return (
		<Card
			onClick={handleNavigateToRestaurant}
			className="w-[18rem] cursor-pointer"
		>
			<div
				className={`${item.open ? "cursor-pointer" : "cursor-not-allowed"} relative`}
			>
				<img
					src={item.images[1]}
					alt="Restaurant"
					className="w-full h-[10rem] rounded-t-md object-cover"
				/>
				<Chip
					size="small"
					className="absolute top-2 left-2"
					color={item.open ? "success" : "error"}
					label={item.open ? "Open" : "Closed"}
				/>
			</div>
			<div className="p-4 textPart lg:flex w-full justify-between">
				<div className="space-y-1">
					<p className="font-semibold text-lg">{item.name}</p>
					<p className="text-gray-500 text-sm">{item.description}</p>
				</div>
				<div>
					<IconButton onClick={handleAddToFavorite}>
						{isPresentInFavorites(auth.favorites, item) ? (
							<FavoriteIcon color="error" />
						) : (
							<FavoriteBorderIcon />
						)}
					</IconButton>
				</div>
			</div>
		</Card>
	);
};
export default RestaurantCard;
