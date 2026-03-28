import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import InstagramIcon from "@mui/icons-material/Instagram";
import Grid from "@mui/material/Grid";
import XIcon from "@mui/icons-material/X";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantStatus } from "../../StateMangement/Restaurant/Action";
import Cookies from "js-cookie";
const RestaurantDetails = () => {
	const dispatch = useDispatch();

	const handleRestaurantStatus = () => {
		dispatch(
			updateRestaurantStatus({
				restaurantId: restaurant.usersRestaurant?.id,
				jwt: Cookies.get("jwt"),
			}),
		);
	};

	const restaurant = useSelector((store) => store.restaurant);

	return (
		<div className="lg:px-20 px-5 pb-3">
			<div className="py-5 flex justify-center items-center gap-4">
				<h1 className="text-2xl lg:text-5xl text-center font-bold p-0">
					{restaurant.usersRestaurant?.name}
				</h1>

				<div>
					<Button
						color={!restaurant.usersRestaurant?.open ? "primary" : "error"}
						className="py-[1rem] px-[2rem]"
						variant="contained"
						onClick={handleRestaurantStatus}
						size="large"
					>
						{restaurant.usersRestaurant?.open ? "Close" : "Open"}
					</Button>
				</div>
			</div>
			<Grid container spacing={2}>
				<Grid size={{ xs: 12 }}>
					<Card>
						<CardHeader
							title={<span className="text-gray-300">Restaurant</span>}
						/>
						<CardContent>
							<div className="space-y-4 text-gray-200">
								<div className="flex">
									<p className="w-48">Owner</p>
									<p className="text-gray-400">
										<span className="pr-5">-</span>
										{restaurant.usersRestaurant?.owner?.fullName}
									</p>
								</div>
								<div className="flex">
									<p className="w-48">Restaurant Name</p>
									<p className="text-gray-400">
										<span className="pr-5">-</span>
										{restaurant.usersRestaurant?.name}
									</p>
								</div>
								<div className="flex">
									<p className="w-48">Cusine Type</p>
									<p className="text-gray-400">
										<span className="pr-5">-</span>
										{restaurant.usersRestaurant?.cuisineType}
									</p>
								</div>
								<div className="flex">
									<p className="w-48">Opening Hours</p>
									<p className="text-gray-400">
										<span className="pr-5">-</span>
										{restaurant.usersRestaurant?.openingHours}
									</p>
								</div>

								<div className="flex">
									<p className="w-48">Status</p>
									<p className="text-gray-400">
										<span className="pr-5">-</span>
										{restaurant.usersRestaurant?.open ? (
											<span className="px-5 py-2 rounded-full bg-green-400 text-gray-900">
												Open
											</span>
										) : (
											<span className="px-5 py-2 rounded-full bg-red-400 text-gray-950">
												Closed
											</span>
										)}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid size={{ xs: 12, lg: 6 }}>
					<Card>
						<CardHeader
							title={<span className="text-gray-300">Address</span>}
						/>
						<CardContent>
							<div className="space-y-4 text-gray-200">
								<div className="flex">
									<p className="w-48">Country</p>
									<p className="text-gray-400">
										<span className="pr-5">-</span>
										{restaurant.usersRestaurant?.address?.country}
									</p>
								</div>
								<div className="flex">
									<p className="w-48">City</p>
									<p className="text-gray-400">
										<span className="pr-5">-</span>
										{restaurant.usersRestaurant?.address?.city}
									</p>
								</div>
								<div className="flex">
									<p className="w-48">Postal Code</p>
									<p className="text-gray-400">
										<span className="pr-5">-</span>
										{restaurant.usersRestaurant?.address?.postalCode}
									</p>
								</div>
								<div className="flex">
									<p className="w-48">Street Address</p>
									<p className="text-gray-400">
										<span className="pr-5">-</span>
										{restaurant.usersRestaurant?.address?.streetAddress}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid size={{ xs: 12, lg: 6 }}>
					<Card>
						<CardHeader
							title={<span className="text-gray-300">Contact</span>}
						/>
						<CardContent>
							<div className="space-y-4 text-gray-200">
								<div className="flex">
									<p className="w-48">Email</p>
									<p className="text-gray-400">
										<span className="pr-5">-</span>
										{restaurant.usersRestaurant?.contactInformation?.email}
									</p>
								</div>
								<div className="flex">
									<p className="w-48">Mobile</p>
									<p className="text-gray-400">
										<span className="pr-5">-</span>
										{restaurant.usersRestaurant?.contactInformation?.mobile}
									</p>
								</div>
								<div className="flex">
									<p className="w-48">Social</p>
									<div className="flex text-gray-400 items-center pb-6">
										<span className="pr-5">-</span>
										<a
											href={`${restaurant.usersRestaurant?.contactInformation?.instagram}`}
										>
											<InstagramIcon sx={{ fontSize: "2.5rem" }} />
										</a>
										<a
											href={`${restaurant.usersRestaurant?.contactInformation?.twitter}`}
											className="ml-5"
										>
											<XIcon sx={{ fontSize: "2.5rem" }} />
										</a>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};

export default RestaurantDetails;
