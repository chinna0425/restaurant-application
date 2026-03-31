import React from "react";
import {
	Box,
	Button,
	Card,
	Divider,
	Grid,
	Modal,
	TextField,
} from "@mui/material";
import CartItem from "./CartItem";
import AddressCard from "./AddressCard";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../StateMangement/Order/Action";
import Cookies from "js-cookie";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "90%",
	maxWidth: 400,
	display: "flex",
	flexDirection: "column",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
	outline: "none",
};

const initialValues = {
	streetAddress: "",
	city: "",
	state: "",
	pinCode: "",
};

const validationSchema = Yup.object().shape({
	streetAddress: Yup.string().required("Street Address is required"),
	city: Yup.string().required("City is required"),
	state: Yup.string().required("State is required"),
	pinCode: Yup.string()
		.matches(/^[0-9]{6}$/, "Enter valid 6 digit pin code")
		.required("Pin Code is required"),
});

const Cart = () => {
	const createOrderUsingSelectedAddress = (data) => {
		console.log(data);
	};

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const cart = useSelector((store) => store.cart);
	const auth = useSelector((store) => store.auth);

	const dispatch = useDispatch();

	const handleSubmit = (values) => {
		const data = {
			jwt: Cookies.get("jwt"),
			order: {
				restaurantId: cart.cartItems[0].food?.restaurant?.id,
				deliveryAddress: {
					fullName: auth.user?.fullName,
					streetAddress: values.streetAddress,
					city: values.city,
					stateProvince: values.state,
					postalCode: values.pinCode,
					country: "India",
				},
			},
		};
		dispatch(createOrder(data));
	};

	const calculateTotal = () => {
		const total = cart.cartItems?.reduce(
			(total, item) => total + item.totalPrice,
			0,
		);
		console.log("calculated total", total);
		return total;
	};

	return (
		<>
			<main className="lg:flex justify-between">
				<section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
					{cart.cartItems?.map((item) => (
						<CartItem key={item.id} item={item} />
					))}
					<Divider />
					<div className="billDetails px-5 text-sm">
						<p className="font-extralight py-5">Bill Details</p>
						<div className="space-y-3">
							<div className="flex justify-between text-gray-400">
								<p>Item Total</p>
								<p>₹{calculateTotal()}</p>
							</div>
							<div className="flex justify-between text-gray-400">
								<p>Delivery Fee</p>
								<p>{cart.cartItems?.length === 0 ? "₹0" : "₹30"}</p>
							</div>
							<div className="flex justify-between text-gray-400">
								<p>GST and Restaurant Charges</p>
								<p>{cart.cartItems?.length === 0 ? "0%" : "18%"}</p>
							</div>
							<Divider />
						</div>
						<div className="flex justify-between text-gray-400 mt-2">
							<p>Total Pay</p>
							<p>₹{calculateTotal() * 1.18 + 50}</p>
						</div>
					</div>
				</section>
				<Divider orientation="vertical" flexItem />
				<section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb:0">
					<div>
						<h1 className="text-center font-semibold text-2xl py-10">
							Choose Delivery Address
						</h1>
						<div className="flex gap-5 flex-wrap justify-center">
							{[1, 1, 1, 1].map((item, index) => (
								<AddressCard
									key={index}
									item={item}
									showButton={true}
									handleSelectAddress={createOrderUsingSelectedAddress}
								/>
							))}
							<Card className="flex gap-5 w-64 p-5">
								<AddLocationIcon />
								<div className="space-y-3 text-gray-500">
									<h1 className="font-semibold text-lg text-white">
										Add New Address
									</h1>

									<Button variant="outlined" fullWidth onClick={handleOpen}>
										Add
									</Button>
								</div>
							</Card>
						</div>
					</div>
				</section>
			</main>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						<Form>
							<Grid container spacing={2}>
								<Grid size={{ xs: 12 }}>
									<Field
										as={TextField}
										name="streetAddress"
										label="Street Address"
										fullWidth
										variant="outlined"
									/>
									<ErrorMessage
										name="streetAddress"
										component="div"
										style={{ color: "red" }}
									/>
								</Grid>

								<Grid size={{ xs: 6 }}>
									<Field
										as={TextField}
										name="state"
										label="State"
										fullWidth
										variant="outlined"
									/>
									<ErrorMessage
										name="state"
										component="div"
										style={{ color: "red" }}
									/>
								</Grid>
								<Grid size={{ xs: 6 }}>
									<Field name="pinCode">
										{({ field, form }) => (
											<TextField
												{...field}
												label="Pin Code"
												fullWidth
												variant="outlined"
												inputProps={{ maxLength: 6 }}
												onChange={(e) => {
													const value = e.target.value.replace(/[^0-9]/g, "");
													form.setFieldValue("pinCode", value);
												}}
											/>
										)}
									</Field>
									<ErrorMessage
										name="pinCode"
										component="div"
										style={{ color: "red" }}
									/>
								</Grid>
								<Grid size={{ xs: 12 }}>
									<Field
										as={TextField}
										name="city"
										label="City"
										fullWidth
										variant="outlined"
									/>
									<ErrorMessage
										name="city"
										component="div"
										style={{ color: "red" }}
									/>
								</Grid>
								<Grid size={{ xs: 12 }}>
									<Button
										type="submit"
										variant="contained"
										fullWidth
										color="primary"
									>
										Delivere Here
									</Button>
								</Grid>
							</Grid>
						</Form>
					</Formik>
				</Box>
			</Modal>
		</>
	);
};

export default Cart;
