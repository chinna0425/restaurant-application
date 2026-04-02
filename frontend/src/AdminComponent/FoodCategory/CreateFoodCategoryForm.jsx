import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../StateMangement/Restaurant/Action";
import Cookies from "js-cookie";
const CreateFoodCategoryForm = ({ onClose }) => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		categoryName: "",
		restaurantId: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			name: formData.categoryName,
			restaurantId: {
				id: formData.restaurantId,
			},
		};
		dispatch(createCategoryAction({ reqData: data, jwt: Cookies.get("jwt") }));
		onClose();
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<div className="p-5">
			<h1 className="text-gray-400 text-center text-xl pb-10">
				Create Food Category
			</h1>
			<form className="space-y-5" onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid size={{ xs: 12 }}>
						<TextField
							fullWidth
							id="categoryName"
							label="Food Category"
							name="categoryName"
							variant="outlined"
							onChange={handleInputChange}
							value={formData.categoryName}
						></TextField>
					</Grid>
				</Grid>
				<div className="text-center mt-5">
					<Button
						variant="contained"
						color="primary"
						type="submit"
						disabled={!formData.categoryName}
					>
						Create Category
					</Button>
				</div>
			</form>
		</div>
	);
};

export default CreateFoodCategoryForm;
