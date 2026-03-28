import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { createEventAction } from "../../StateMangement/Restaurant/Action";
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

const Events = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const dispatch = useDispatch();
	const jwt = Cookies.get("jwt");
	const restaurant = useSelector((store) => store.restaurant);

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			...formValues,
			startedAt: formValues.startedAt
				? formValues.startedAt.format("MMMM DD, YYYY hh:mm A")
				: null,

			endsAt: formValues.endsAt
				? formValues.endsAt.format("MMMM DD, YYYY hh:mm A")
				: null,
		};

		dispatch(
			createEventAction({
				data,
				restaurantId: restaurant.usersRestaurant?.id,
				jwt,
			}),
		);

		console.log("final data:", data);
	};

	const [formValues, setFormValues] = useState({
		image: "",
		location: "",
		name: "",
		startedAt: null,
		endsAt: null,
	});

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleDateChange = (date, dateType) => {
		setFormValues({ ...formValues, [dateType]: date });
	};

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
								<Grid size={{ xs: 12 }}>
									<TextField
										name="image"
										label="Image URL"
										variant="outlined"
										fullWidth
										value={formValues.image}
										onChange={handleFormChange}
									/>
								</Grid>
								<Grid size={{ xs: 12 }}>
									<TextField
										name="location"
										label="Location"
										variant="outlined"
										fullWidth
										value={formValues.location}
										onChange={handleFormChange}
									/>
								</Grid>
								<Grid size={{ xs: 12 }}>
									<TextField
										name="name"
										label="Event Name"
										variant="outlined"
										fullWidth
										value={formValues.name}
										onChange={handleFormChange}
									/>
								</Grid>
								<Grid size={{ xs: 12 }}>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DateTimePicker
											label="Start Date and Time"
											value={formValues.startedAt}
											onChange={(newValue) =>
												handleDateChange(newValue, "startedAt")
											}
											format="MM/DD/YYYY hh:mm A"
											sx={{ width: "100%" }}
											slotProps={{
												textField: {
													fullWidth: true,
												},
												popper: {
													disablePortal: true,
													placement: "top-start",
													modifiers: [
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
											onChange={(newValue) =>
												handleDateChange(newValue, "endsAt")
											}
											format="MM/DD/YYYY hh:mm A"
											sx={{ width: "100%" }}
											minDateTime={formValues.startedAt}
											slotProps={{
												textField: {
													fullWidth: true,
												},
												popper: {
													placement: "top-start",
													disablePortal: true,
													modifiers: [
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
								<Button type="submit" variant="contained">
									Submit
								</Button>
							</div>
						</form>
					</Box>
				</Modal>
			</div>
		</div>
	);
};

export default Events;
