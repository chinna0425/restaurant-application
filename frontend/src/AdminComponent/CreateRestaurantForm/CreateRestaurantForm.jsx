import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import { Button, TextField } from "@mui/material";
import { uploadImageToCloudinary } from "../util/UploadToCloudinary";
import { useDispatch } from "react-redux";
import { createRestaurant } from "../../StateMangement/Restaurant/Action";

const initialValues = {
	name: "",
	description: "",
	cuisineType: "",
	streetAddress: "",
	city: "",
	stateProvince: "",
	postalCode: "",
	country: "",
	email: "",
	mobile: "",
	twitter: "",
	instagram: "",
	openingHours: "Mon-Sun : 9:00 AM - 12:00 PM",
	images: [],
};

const CreateRestaurantForm = () => {
	const dispatch = useDispatch();
	const jwt = localStorage.getItem("jwt");
	const formik = useFormik({
		initialValues,
		onSubmit: (values) => {
			const data = {
				name: values.name,
				description: values.description,
				cuisineType: values.cuisineType,
				address: {
					streetAddress: values.streetAddress,
					city: values.city,
					stateProvince: values.stateProvince,
					postalCode: values.postalCode,
					country: values.country,
				},
				contactInformation: {
					email: values.email,
					mobile: values.mobile,
					twitter: values.twitter,
					instagram: values.instagram,
				},
				openingHours: values.openingHours,
				images: values.images.map((img) => img.url),
			};
			console.log("Create restaurant data", data);
			dispatch(createRestaurant({ data, token: jwt }));
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

	return (
		<div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
			<div className="lg:max-w-xl">
				<h1 className="font-bold text-2xl text-center py-2">
					Add New Restaurant Details
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
									<div className="relative" key={image.url || index}>
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
								label="Name"
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
								id="cuisineType"
								name="cuisineType"
								label="CuisineType"
								variant="outlined"
								onChange={formik.handleChange}
								value={formik.values.cuisineType}
							></TextField>
						</Grid>
						<Grid size={{ xs: 12, lg: 6 }}>
							<TextField
								fullWidth
								id="openingHours"
								name="openingHours"
								label="Opening Hours"
								variant="outlined"
								onChange={formik.handleChange}
								value={formik.values.openingHours}
							></TextField>
						</Grid>

						<Grid size={{ xs: 12 }}>
							<TextField
								fullWidth
								id="streetAddress"
								name="streetAddress"
								label="Street Address"
								variant="outlined"
								onChange={formik.handleChange}
								value={formik.values.streetAddress}
							></TextField>
						</Grid>
						<Grid size={{ xs: 12, lg: 4 }}>
							<TextField
								fullWidth
								id="city"
								name="city"
								label="City"
								variant="outlined"
								onChange={formik.handleChange}
								value={formik.values.city}
							></TextField>
						</Grid>
						<Grid size={{ xs: 12, lg: 4 }}>
							<TextField
								fullWidth
								id="stateProvince"
								name="stateProvince"
								label="State/Province"
								variant="outlined"
								onChange={formik.handleChange}
								value={formik.values.stateProvince}
							></TextField>
						</Grid>
						<Grid size={{ xs: 12, lg: 4 }}>
							<TextField
								fullWidth
								id="postalCode"
								name="postalCode"
								label="Postal Code"
								variant="outlined"
								onChange={formik.handleChange}
								value={formik.values.postalCode}
							></TextField>
						</Grid>
						<Grid size={{ xs: 12 }}>
							<TextField
								fullWidth
								id="country"
								name="country"
								label="Country"
								variant="outlined"
								onChange={formik.handleChange}
								value={formik.values.country}
							></TextField>
						</Grid>
						<Grid size={{ xs: 12, lg: 6 }}>
							<TextField
								fullWidth
								id="email"
								name="email"
								label="Email"
								variant="outlined"
								onChange={formik.handleChange}
								value={formik.values.email}
							></TextField>
						</Grid>
						<Grid size={{ xs: 12, lg: 6 }}>
							<TextField
								fullWidth
								id="mobile"
								name="mobile"
								label="Mobile"
								variant="outlined"
								onChange={formik.handleChange}
								value={formik.values.mobile}
							></TextField>
						</Grid>
						<Grid size={{ xs: 12, lg: 6 }}>
							<TextField
								fullWidth
								id="instagram"
								name="instagram"
								label="Instagram"
								variant="outlined"
								onChange={formik.handleChange}
								value={formik.values.instagram}
							></TextField>
						</Grid>
						<Grid size={{ xs: 12, lg: 6 }}>
							<TextField
								fullWidth
								id="twitter"
								name="twitter"
								label="Twitter"
								variant="outlined"
								onChange={formik.handleChange}
								value={formik.values.twitter}
							></TextField>
						</Grid>
					</Grid>
					<div className="text-center">
						<Button variant="contained" color="primary" type="submit">
							Create Restaurant
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateRestaurantForm;
