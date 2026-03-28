import { Box, Card, CardHeader, IconButton, Modal } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CreateIcon from "@mui/icons-material/Create";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import CreateIngredientCategoryForm from "./CreateIngredientCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientCategory } from "../../StateMangement/Ingredients/Action";
import Cookies from "js-cookie";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const IngredientCategoryTable = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const dispatch = useDispatch();
	const jwt = Cookies.get("jwt");
	const { restaurant, ingredients } = useSelector((store) => store);
	useEffect(() => {
		dispatch(
			getIngredientCategory({ id: restaurant.usersRestaurant?.id, jwt }),
		);
	}, []);

	return (
		<Box>
			<Card className="mt-1">
				<CardHeader
					title={"Ingredient Category"}
					action={
						<IconButton onClick={handleOpen} aria-label="settings">
							<CreateIcon />
						</IconButton>
					}
					sx={{ paddingTop: 2, alignItems: "center" }}
				/>

				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="left">Id</TableCell>
								<TableCell align="left">Name</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{ingredients.category.map((item) => (
								<TableRow
									key={item.id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell align="left">{item.id}</TableCell>
									<TableCell align="left">{item.name}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Card>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<CreateIngredientCategoryForm />
				</Box>
			</Modal>
		</Box>
	);
};

export default IngredientCategoryTable;
