import {
	Divider,
	FormControl,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	getRestaurantById,
	getRestaurantsCategory,
} from "../../StateMangement/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "../../StateMangement/Menu/Action";

const foodItemType = [
	{
		label: "All",
		value: "all",
	},
	{
		label: "Vegetaian only",
		value: "vegetarian",
	},
	{
		label: "Non-Vegetarian only",
		value: "non_vegetarian",
	},
	{
		label: "Seasonal",
		value: "seasonal",
	},
];

const RestaurantDetails = () => {
	const [foodType, setFoodType] = useState("all");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const jwt = localStorage.getItem("jwt");
	const restaurant = useSelector((store) => store.restaurant);
	const menu = useSelector((store) => store.menu);

	const [selectedCategory, setSelectedCategory] = useState("");

	const { id } = useParams();

	const handleFoodFilter = (e) => {
		setFoodType(e.target.value);
	};

	const handleCategoryFilter = (e) => {
		setSelectedCategory(e.target.value);
		console.log(e.target.value);
	};

	//console.log("restaurant seperate", restaurant);

	useEffect(() => {
		dispatch(getRestaurantById({ restaurantId: id, jwt }));
		dispatch(getRestaurantsCategory({ jwt, restaurantId: id }));
	}, []);

	useEffect(() => {
		dispatch(
			getMenuItemsByRestaurantId({
				jwt,
				restaurantId: id,
				vegetarian: foodType === "vegetarian" ? true : false,
				nonVeg: foodType === "non_vegetarian" ? true : false,
				seasonal: foodType === "seasonal" ? true : false,
				foodCategory: selectedCategory,
			}),
		);
	}, [selectedCategory, foodType]);

	return (
		<div className="px-5 lg:px-20">
			<section>
				{/* <h1 className="text-gray-500 py-2 mt-10">
					Home/india/indian fastfood/3
				</h1> */}
				<div className="mt-2">
					<Grid container spacing={2}>
						<Grid size={12}>
							<img
								src={restaurant.restaurant?.images[0]}
								alt="reastaurant"
								className="w-full h-[40vh] object-cover"
							/>
						</Grid>
						<Grid size={{ xs: 12, lg: 6 }}>
							<img
								src={restaurant.restaurant?.images[1]}
								alt="reastaurant"
								className="w-full h-[40vh] object-cover"
							/>
						</Grid>
						<Grid size={{ xs: 12, lg: 6 }}>
							<img
								src="https://res.cloudinary.com/dcpesbd8q/image/upload/v1707802815/dtwyuhxuawmg3qzffv84.jpg"
								alt="reastaurant"
								className="w-full h-[40vh] object-cover"
							/>
						</Grid>
					</Grid>
				</div>
				<div className="pt-3 pb-5">
					<h1 className="text-4xl font-semibold">
						{restaurant.restaurant?.name}
					</h1>
					<p className="text-gray-500 mt-1">
						{restaurant.restaurant?.description}
					</p>
					<div className="space-y-3 mt-3">
						<p className="text-gray-500 flex items-center gap-3">
							<LocationOnIcon />
							<span>Hyderabad, Erragadda, Telangana</span>
						</p>
						<p className="text-gray-500 flex items-center gap-3">
							<CalendarTodayIcon />
							<span>Mon-Sun: 0.00 AM - 9.00PM (Today)</span>
						</p>
					</div>
				</div>
			</section>
			<Divider />
			<section className="pt-[2rem] lg:flex relative">
				<div className="space-y-10 lg:w-[20%] filter">
					<div className="box space-y-5 lg:sticky top-28">
						<div>
							<Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
								Food Type
							</Typography>
							<FormControl className="py-10 space-y-5" component={"fieldset"}>
								<RadioGroup
									name="food_type"
									value={foodType || ""}
									onChange={handleFoodFilter}
								>
									{foodItemType.map((item) => (
										<FormControlLabel
											key={item.value}
											value={item.value}
											control={<Radio />}
											label={item.label}
										/>
									))}
								</RadioGroup>
							</FormControl>
						</div>
						<Divider />
						<div>
							<Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
								Food Category
							</Typography>
							<FormControl className="py-10 space-y-5" component={"fieldset"}>
								<RadioGroup
									name="food_category"
									onChange={handleCategoryFilter}
									value={selectedCategory}
								>
									{restaurant.categories.map((item, index) => (
										<FormControlLabel
											key={index}
											value={item.name}
											control={<Radio />}
											label={item.name}
										/>
									))}
								</RadioGroup>
							</FormControl>
						</div>
					</div>
				</div>
				<div className="space-y-10 lg:w-[80%] lg:pl-10">
					{menu.menuItems.map((item, index) => (
						<MenuCard key={index + 1} item={item} />
					))}
				</div>
			</section>
		</div>
	);
};
export default RestaurantDetails;
