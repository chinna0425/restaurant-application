import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredientCategory } from "../../StateMangement/Ingredients/Action";
import Cookies from "js-cookie";

const CreateIngredientCategoryForm = () => {
	const dispatch = useDispatch();
	const jwt = Cookies.get("jwt");
	const restaurant = useSelector((store) => store.restaurant);
	const [formData, setFormData] = useState({
		name: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			name: formData.name,
			restaurantId: restaurant.usersRestaurant?.id,
		};
		console.log("ingredient category form", data);
		dispatch(createIngredientCategory({ data, jwt }));
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<div className="p-5">
			<h1 className="text-gray-400 text-center text-xl pb-10">
				Create Ingredient Category
			</h1>
			<form className="space-y-5" onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid size={{ xs: 12 }}>
						<TextField
							fullWidth
							id="name"
							label="Ingredient Category"
							name="name"
							variant="outlined"
							onChange={handleInputChange}
							value={formData.name}
						></TextField>
					</Grid>
				</Grid>
				<div className="text-center mt-5">
					<Button variant="contained" color="primary" type="submit">
						Create
					</Button>
				</div>
			</form>
		</div>
	);
};

export default CreateIngredientCategoryForm;
