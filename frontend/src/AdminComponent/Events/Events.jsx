import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { Fragment, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
	createEventAction,
	getRestaurantEvents,
} from "../../StateMangement/Restaurant/Action";
import Cookies from "js-cookie";
import { uploadImageToCloudinary } from "../util/UploadToCloudinary";
import { CircularProgress, IconButton } from "@mui/material";
import EventCard from "../../components/Profile/EventCard";
import "./Events.css";
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

const Events = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const dispatch = useDispatch();
	const jwt = Cookies.get("jwt");
	const restaurant = useSelector((store) => store.restaurant);

	console.log("restaunat events kiran", restaurant.restaurantsEvents);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!isFormValid) {
			setTouched({
				location: true,
				name: true,
				startedAt: true,
				endsAt: true,
				image: true,
			});
			return;
		}

		const data = {
			...formValues,
			startedAt: formValues.startedAt.format("MMMM DD, YYYY hh:mm A"),
			endsAt: formValues.endsAt.format("MMMM DD, YYYY hh:mm A"),
		};

		dispatch(
			createEventAction({
				data,
				restaurantId: restaurant.usersRestaurant?.id,
				jwt,
			}),
		);

		setFormValues({
			image: "",
			location: "",
			name: "",
			startedAt: null,
			endsAt: null,
		});
		setTouched({
			location: false,
			name: false,
			startedAt: false,
			endsAt: false,
			image: false,
		});
		handleClose();
	};

	useEffect(() => {
		if (jwt) {
			dispatch(
				getRestaurantEvents({
					restaurantId: restaurant.usersRestaurant?.id,
					jwt,
				}),
			);
		}
	}, []);

	const [formValues, setFormValues] = useState({
		image: "",
		location: "",
		name: "",
		startedAt: null,
		endsAt: null,
	});

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];

		if (!file) return;

		e.target.value = null;

		setUploadImage(true);
		const imageUrl = await uploadImageToCloudinary(file);

		setFormValues({ ...formValues, image: imageUrl });

		setUploadImage(false);
	};

	const [uploadImage, setUploadImage] = useState(false);

	const handleRemoveUploadedImage = () => {
		setFormValues({ ...formValues, image: "" });
	};

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleDateChange = (date, dateType) => {
		setFormValues({ ...formValues, [dateType]: date });
	};

	const isFormValid =
		formValues.location.trim() !== "" &&
		formValues.image.trim() !== "" &&
		formValues.name.trim() !== "" &&
		formValues.startedAt !== null &&
		formValues.endsAt !== null &&
		formValues.endsAt?.isAfter(formValues.startedAt);
	const [touched, setTouched] = useState({
		location: false,
		name: false,
		startedAt: false,
		endsAt: false,
		image: false,
	});
	return (
		<div>
			<div className="p-5">
				<Button onClick={handleOpen} variant="contained">
					<AddIcon className="mr-1" /> Create New Event
				</Button>
				<Modal
					open={open}
					disableEnforceFocus
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<form onSubmit={handleSubmit}>
							<Grid container spacing={2}>
								<Grid className="flex flex-wrap gap-5" size={{ xs: 12 }}>
									{!formValues.image && (
										<Fragment>
											<input
												type="file"
												accept="image/*"
												id="fileInput"
												style={{ display: "none" }}
												onChange={handleImageUpload}
												onBlur={() => setTouched({ ...touched, image: true })}
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
											{touched.image && formValues.image === "" && (
												<p className="text-red-500 text-sm">
													Location is required
												</p>
											)}
										</Fragment>
									)}
									{formValues.image && (
										<div className="flex flex-wrap gap-2">
											<div className="relative">
												<img
													className="w-24 h-24 object-cover rounded-2xl"
													src={formValues.image}
													alt="upload"
												/>
												<IconButton
													size="small"
													sx={{
														position: "absolute",
														top: 0,
														right: 0,
														outline: "none",
														color: "red",
													}}
													onClick={handleRemoveUploadedImage}
												>
													<CloseIcon sx={{ fontSize: "1.2rem" }} />
												</IconButton>
											</div>
										</div>
									)}
								</Grid>
								<Grid size={{ xs: 12 }}>
									<TextField
										name="location"
										label="Location"
										variant="outlined"
										fullWidth
										value={formValues.location}
										onChange={handleFormChange}
										onBlur={() => setTouched({ ...touched, location: true })}
									/>
									{touched.location && formValues.location === "" && (
										<p className="text-red-500 text-sm">Location is required</p>
									)}
								</Grid>
								<Grid size={{ xs: 12 }}>
									<TextField
										name="name"
										label="Event Name"
										variant="outlined"
										fullWidth
										value={formValues.name}
										onChange={handleFormChange}
										onBlur={() => setTouched({ ...touched, name: true })}
									/>
									{touched.name && formValues.name === "" && (
										<p className="text-red-500 text-sm">
											Event name is required
										</p>
									)}
								</Grid>
								<Grid size={{ xs: 12 }}>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DateTimePicker
											label="Start Date and Time"
											value={formValues.startedAt}
											onChange={(value) => {
												handleDateChange(value, "startedAt");

												setTouched((prev) => ({
													...prev,
													startedAt: true,
												}));
											}}
											slotProps={{
												textField: {
													fullWidth: true,
													error: touched.startedAt && !formValues.startedAt,
													helperText:
														touched.startedAt && !formValues.startedAt
															? "Start date is required"
															: "",
													onBlur: () =>
														setTouched((prev) => ({
															...prev,
															startedAt: true,
														})),
												},
												popper: {
													placement: "top-start",
													disablePortal: false,
													modifiers: [
														{
															name: "flip",
															enabled: true,
														},
														{
															name: "preventOverflow",
															options: {
																boundary: "window",
															},
														},
													],
												},
											}}
										/>
									</LocalizationProvider>
								</Grid>
								<Grid size={{ xs: 12 }}>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DateTimePicker
											label="End Date and Time"
											value={formValues.endsAt}
											onChange={(value) => {
												handleDateChange(value, "endsAt");

												setTouched((prev) => ({
													...prev,
													endsAt: true,
												}));
											}}
											minDateTime={formValues.startedAt}
											slotProps={{
												textField: {
													fullWidth: true,
													error:
														touched.endsAt &&
														(!formValues.endsAt ||
															!formValues.endsAt.isAfter(formValues.startedAt)),
													helperText:
														touched.endsAt && !formValues.endsAt
															? "End date is required"
															: touched.endsAt &&
																  formValues.startedAt &&
																  formValues.endsAt &&
																  !formValues.endsAt.isAfter(
																		formValues.startedAt,
																  )
																? "End date must be after start date"
																: "",
													onBlur: () =>
														setTouched((prev) => ({
															...prev,
															endsAt: true,
														})),
												},
												popper: {
													placement: "top-start",
													disablePortal: false,
													modifiers: [
														{
															name: "flip",
															enabled: true,
														},
														{
															name: "preventOverflow",
															options: {
																boundary: "window",
															},
														},
													],
												},
											}}
										/>
									</LocalizationProvider>
								</Grid>
							</Grid>
							<div className="text-center mt-5">
								<Button
									type="submit"
									variant="contained"
									disabled={!isFormValid}
								>
									Submit
								</Button>
							</div>
						</form>
					</Box>
				</Modal>
			</div>
			{restaurant.restaurantsEvents?.length > 0 ? (
				<div className="pb-5">
					<h2 className="text-2xl font-semibold mb-4">Events List</h2>
					<div className="mt-5 px-5 flex justify-space-between flex-wrap gap-5">
						{restaurant.restaurantsEvents?.map((event) => (
							<EventCard key={event.id} event={event} />
						))}
					</div>
				</div>
			) : (
				<div className="home-data-notfound-container">
					<img
						src="https://media.istockphoto.com/id/1338874207/vector/upcoming-events-speech-bubble-banner-with-upcoming-events-text-glassmorphism-style-for.jpg?s=612x612&w=0&k=20&c=4nAQLO0c4rMWwMPOMTbn_6ldPYdB5J4ruSfOLYg2qik="
						alt="upcoming-events"
						className="no-data-image"
						loading="lazy"
					/>

					<p className="text-gray-400 text-lg mt-5 text-center">
						Add events to keep the customers engaged and informed about the
						latest happenings at your restaurant!
						<br />
						Click on the "Create New Event" button to get started.
						<br />
						Regularly updating your events can help attract more customers and
						boost your restaurant's visibility.
					</p>
				</div>
			)}
		</div>
	);
};

export default Events;
