import {
	Avatar,
	AvatarGroup,
	Box,
	Button,
	Card,
	CardHeader,
	Chip,
	Menu,
	MenuItem,
} from "@mui/material";
import Cookies from "js-cookie";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import {
	fetchRestaurantsOrder,
	updateOrderStatus,
} from "../../StateMangement/RestaurantOrder/Action";

const orderStatus = [
	{
		id: 1,
		label: "Pending",
		value: "PENDING",
	},
	{
		id: 2,
		label: "Completed",
		value: "COMPLETED",
	},
	{
		id: 3,
		label: "Out For Delivery",
		value: "OUT_FOR_DELIVERY",
	},
	{
		id: 4,
		label: "Delivered",
		value: "DELIVERED",
	},
];

const OrderTable = ({ filterValue }) => {
	const dispatch = useDispatch();
	const jwt = Cookies.get("jwt");
	const restaurant = useSelector((store) => store.restaurant);
	const restaurantOrder = useSelector((store) => store.restaurantOrder);
	const handleUpdateOrder = (orderId, orderStatus) => {
		dispatch(updateOrderStatus({ orderId, orderStatus, jwt }));
		handleClose();
	};
	useEffect(() => {
		dispatch(
			fetchRestaurantsOrder({
				jwt,
				restaurantId: restaurant.usersRestaurant?.id,
			}),
		);
	}, []);

	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedOrderId, setSelectedOrderId] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event, orderId) => {
		setAnchorEl(event.currentTarget);
		setSelectedOrderId(orderId);
	};
	const handleClose = () => {
		setAnchorEl(null);
		setSelectedOrderId(null);
	};

	return (
		<Box>
			<Card className="mt-1">
				<CardHeader
					title={"All Orders"}
					sx={{ paddingTop: 2, alignItems: "center" }}
				/>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Id</TableCell>
								<TableCell align="right">Image</TableCell>
								<TableCell align="right">Customer</TableCell>
								<TableCell align="right">Price</TableCell>
								<TableCell align="right">Name</TableCell>
								<TableCell align="right">Ingredients</TableCell>
								<TableCell align="right">Status</TableCell>
								<TableCell align="right">Update</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{restaurantOrder.orders
								?.filter((order) => {
									if (filterValue === "ALL") {
										return true;
									}
									return order.orderStatus === filterValue;
								})
								?.map((order) => (
									<TableRow
										key={"order" + order.id}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											{order.id}
										</TableCell>
										<TableCell align="right">
											<AvatarGroup>
												{order.items.map((each) => (
													<Fragment key={`${each.id}-key`}>
														<Avatar
															sx={{ marginRight: "10px" }}
															src={each.food?.images[0]}
														/>
													</Fragment>
												))}
											</AvatarGroup>
										</TableCell>
										<TableCell align="right">
											{order?.customer?.fullName}
										</TableCell>
										<TableCell align="right">{order?.totalPrice}</TableCell>
										<TableCell align="right">
											{order?.items?.map((orderItem, idx) => (
												<p key={"order" + idx}>{orderItem.food?.name}</p>
											))}
										</TableCell>
										<TableCell align="right">
											{order.items.map((orderItem, index) => (
												<div key={"orderItem" + index}>
													{orderItem.ingredients.map((ingredient, index) => (
														<Chip key={ingredient + index} label={ingredient} />
													))}
												</div>
											))}
										</TableCell>

										<TableCell align="right">{order?.orderStatus}</TableCell>

										<TableCell align="right">
											<Button
												id="basic-button"
												aria-controls={open ? "basic-menu" : undefined}
												aria-haspopup="true"
												aria-expanded={open ? "true" : undefined}
												onClick={(event) => handleClick(event, order.id)}
												variant="contained"
											>
												Update
											</Button>
											<Menu
												id="basic-menu"
												anchorEl={anchorEl}
												open={open}
												onClose={handleClose}
												slotProps={{
													list: {
														"aria-labelledby": "basic-button",
													},
												}}
											>
												{orderStatus.map((status) => (
													<MenuItem
														key={status.id}
														onClick={() =>
															handleUpdateOrder(selectedOrderId, status.value)
														}
													>
														{status.label}
													</MenuItem>
												))}
											</Menu>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Card>
		</Box>
	);
};

export default OrderTable;
