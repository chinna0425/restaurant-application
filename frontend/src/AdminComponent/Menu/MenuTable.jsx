import {
	Avatar,
	Box,
	Card,
	CardActions,
	CardHeader,
	Chip,
	IconButton,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";
import {
	deleteFoodAction,
	getMenuItemsByRestaurantId,
} from "../../StateMangement/Menu/Action";

const MenuTable = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const jwt = Cookies.get("jwt");
	const restaurant = useSelector((store) => store.restaurant);
	const menu = useSelector((store) => store.menu);

	useEffect(() => {
		dispatch(
			getMenuItemsByRestaurantId({
				restaurantId: restaurant.usersRestaurant?.id,
				jwt,
			}),
		);
	}, []);

	const handleDeleteFood = (foodId) => {
		dispatch(deleteFoodAction({ foodId, jwt }));
	};

	return (
		<Box>
			<Card className="mt-1">
				<CardHeader
					title={"Menu"}
					action={
						<IconButton
							onClick={() => navigate("/admin/restaurants/add-food")}
							aria-label="settings"
						>
							<CreateIcon />
						</IconButton>
					}
					sx={{ paddingTop: 2, alignItems: "center" }}
				/>

				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="left">Image</TableCell>
								<TableCell align="right">Title</TableCell>
								<TableCell align="right">Price</TableCell>
								<TableCell align="right">Ingredients</TableCell>
								<TableCell align="right">Availability</TableCell>
								<TableCell align="right">Delete</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{menu.menuItems?.map((item, index) => (
								<TableRow
									key={`${item.id}-${index}`}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell align="left">
										{<Avatar src={item.images[0]} />}
									</TableCell>
									<TableCell align="right">{item.name}</TableCell>
									<TableCell align="right">₹{item.price}</TableCell>
									<TableCell align="right">
										{item.ingredients.map((each) => (
											<Chip
												sx={{ marginRight: "5px" }}
												key={each.id}
												label={each.name}
											/>
										))}
									</TableCell>
									<TableCell align="right">
										{item.available ? "InStock" : "Out Of Stock"}
									</TableCell>
									<TableCell align="right">
										<IconButton
											color="primary"
											onClick={() => handleDeleteFood(item.id)}
										>
											<DeleteIcon />
										</IconButton>
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

export default MenuTable;
