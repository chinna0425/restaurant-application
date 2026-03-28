import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredient } from "../../StateMangement/Ingredients/Action";
import Cookies from "js-cookie";
import { store } from "../../StateMangement/store";

const CreateIngredientForm = () => {
	const dispatch = useDispatch();
	const restaurant = useSelector((store) => store.restaurant);
	const ingredients = useSelector((store) => store.ingredients);
	const [formData, setFormData] = useState({
		name: "",
		categoryId: "",
	});
	const jwt = Cookies.get("jwt");
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			...formData,
			restaurantId: restaurant.usersRestaurant.id,
		};
		dispatch(createIngredient({ data, jwt }));

		console.log("category", data);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<div className="p-5">
			<h1 className="text-gray-400 text-center text-xl pb-10">
				Create Ingredient
			</h1>
			<form className="space-y-5" onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid size={{ xs: 12 }}>
						<TextField
							fullWidth
							id="name"
							label="Ingredient Name"
							name="name"
							variant="outlined"
							onChange={handleInputChange}
							value={formData.name}
						></TextField>
					</Grid>
					<Grid size={{ xs: 12 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Category</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="categoryId"
								name="categoryId"
								value={formData.categoryId}
								label="Category"
								onChange={handleInputChange}
							>
								{ingredients.category.map((item) => (
									<MenuItem key={item.id} value={item.id}>
										{item.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
				<div className="text-center mt-5">
					<Button variant="contained" color="primary" type="submit">
						Create Ingredient
					</Button>
				</div>
			</form>
		</div>
	);
};

export default CreateIngredientForm;
