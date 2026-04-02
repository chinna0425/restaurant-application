import { Card, Chip, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../../StateMangement/Authentication/Action";
import { isPresentInFavorites } from "../config/logic";
import Cookies from "js-cookie";

const RestaurantCard = ({ item }) => {
	console.log("Each restaurant", item);
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
			onClick={item.open ? handleNavigateToRestaurant : null}
			className="w-full cursor-pointer h-full flex flex-col rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
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
					{item.name && <p className="font-semibold text-lg">{item.name}</p>}
					{item.title && <p className="font-semibold text-lg">{item.title}</p>}
					<p className="text-gray-500 text-sm line-clamp-2">
						{item.description}
					</p>
				</div>
				<div>
					<IconButton
						onClick={(e) => {
							e.stopPropagation();
							handleAddToFavorite();
						}}
					>
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
