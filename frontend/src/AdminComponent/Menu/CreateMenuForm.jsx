import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import {
	Box,
	Button,
	Chip,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
} from "@mui/material";
import { uploadImageToCloudinary } from "../util/UploadToCloudinary";
import { useDispatch, useSelector } from "react-redux";
import { createMenuItem } from "../../StateMangement/Menu/Action";
import { getIngredientsOfRestaurant } from "../../StateMangement/Ingredients/Action";
import Cookies from "js-cookie";

const initialValues = {
	name: "",
	description: "",
	price: "",
	category: "",
	restaurantId: "",
	vegetarian: true,
	seasonable: false,
	ingredients: [],
	images: [],
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const CreateMenuForm = () => {
	const dispatch = useDispatch();
	const jwt = Cookies.get("jwt");
	const restaurant = useSelector((store) => store.restaurant);
	const ingredients = useSelector((store) => store.ingredients);
	const formik = useFormik({
		initialValues,
		onSubmit: (values) => {
			values.restaurantId = restaurant.usersRestaurant?.id;
			values.images = values.images.map((img) => img.url);
			dispatch(createMenuItem({ menu: values, jwt }));
			console.log("data", values);
		},
	});
	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;
		e.target.value = null;
		// Check BEFORE upload
		const isDuplicate = formik.values.images.some(
			(img) => img.name === file.name,
		);
		if (isDuplicate) {
			alert("Image already uploaded");
			return;
		}
		setUploadImage(true);
		const image = await uploadImageToCloudinary(file);
		formik.setFieldValue("images", [
			...formik.values.images,
			{
				url: image,
				name: file.name,
			},
		]);
		setUploadImage(false);
	};
	const [uploadImage, setUploadImage] = useState(false);
	const handleRemoveUploadedImage = (index) => {
		const updatedImages = [...formik.values.images];
		updatedImages.splice(index, 1);
		formik.setFieldValue("images", updatedImages);
	};

	useEffect(() => {
		dispatch(
			getIngredientsOfRestaurant({
				restaurantId: restaurant.usersRestaurant?.id,
				jwt,
			}),
		);
	}, []);

	return (
		<div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
			<div className="lg:max-w-2xl">
				<h1 className="font-bold text-2xl text-center py-2">
					Add Menu Details
				</h1>
				<form onSubmit={formik.handleSubmit} className="space-y-4 mt-3">
					<Grid container spacing={2}>
						<Grid className="flex flex-wrap gap-5" size={{ xs: 12 }}>
							<input
								type="file"
								accept="image/*"
								id="fileInput"
								style={{ display: "none" }}
								onChange={handleImageUpload}
							/>
							<label className="relative" htmlFor="fileInput">
								<span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
									<AddPhotoAlternateIcon className="text-white" />
								</span>
								{uploadImage && (
									<div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
										<CircularProgress />
									</div>
								)}
							</label>
							<div className="flex flex-wrap gap-2">
								{formik.values.images.map((image, index) => (
									<div className="relative" key={`${image?.name}-${index}`}>
										<img
											className="w-24 h-24 object-cover"
											src={image.url}
											alt="upload"
										/>
										<IconButton
											size="small"
											sx={{
												position: "absolute",
												top: 0,
												right: 0,
												outline: "none",
											}}
											onClick={() => handleRemoveUploadedImage(index)}
										>
											<CloseIcon sx={{ fontSize: "1rem" }} />
										</IconButton>
									</div>
								))}
							</div>
						</Grid>
						<Grid size={{ xs: 12 }}>
							<TextField
								fullWidth
								id="name"
								label="Item Name"
								name="name"
								variant="outlined"
								onChange={formik.handleChange}
								value={formik.values.name}
							></TextField>
						</Grid>
						<Grid size={{ xs: 12 }}>
							<TextField
								fullWidth
								id="description"
								name="description"
								label="Description"
								variant="outlined"
								onChange={formik.handleChange}
								value={formik.values.description}
							></TextField>
						</Grid>
						<Grid size={{ xs: 12, lg: 6 }}>
							<TextField
								fullWidth
								id="price"
								name="price"
								label="Price"
								variant="outlined"
								onChange={formik.handleChange}
								value={formik.values.price}
							></TextField>
						</Grid>
						<Grid size={{ xs: 12, lg: 6 }}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">
									Food Category
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="category"
									name="category"
									value={formik.values.category || ""}
									label="Food Category"
									onChange={(e) => {
										const selected = restaurant.categories.find(
											(item) => item.id === e.target.value.id,
										);
										formik.setFieldValue("category", selected);
									}}
								>
									{restaurant.categories?.map((item) => (
										<MenuItem key={item.id} value={item}>
											{item.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						<Grid size={{ xs: 12 }}>
							<FormControl fullWidth>
								<InputLabel id="demo-multiple-chip-label">
									Ingredients
								</InputLabel>
								<Select
									labelId="demo-multiple-chip-label"
									id="demo-multiple-chip"
									name="ingredients"
									multiple
									value={formik.values.ingredients}
									onChange={formik.handleChange}
									input={
										<OutlinedInput
											id="select-multiple-chip"
											label="Ingredients"
										/>
									}
									renderValue={(selected) => (
										<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
											{selected.map((value, index) => (
												<Chip key={value?.id || index} label={value?.name} />
											))}
										</Box>
									)}
									// MenuProps={MenuProps}
								>
									{ingredients.ingredients?.map((item, index) => (
										<MenuItem key={item.id || index} value={item}>
											{item.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						<Grid size={{ xs: 12, lg: 6 }}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">
									Is Vegetarian
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="vegetarian"
									name="vegetarian"
									value={formik.values.vegetarian}
									label="Is Vegetarian"
									onChange={formik.handleChange}
								>
									<MenuItem value={true}>Yes</MenuItem>
									<MenuItem value={false}>No</MenuItem>
								</Select>
							</FormControl>
						</Grid>

						<Grid size={{ xs: 12, lg: 6 }}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">
									Is Seasonal
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="seasonable"
									name="seasonable"
									value={formik.values.seasonable}
									label="Is Seasonal"
									onChange={formik.handleChange}
								>
									<MenuItem value={true}>Yes</MenuItem>
									<MenuItem value={false}>No</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid>
					<div className="text-center">
						<Button variant="contained" color="primary" type="submit">
							Add Menu Item
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateMenuForm;
