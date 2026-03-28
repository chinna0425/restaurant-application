/* import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../StateMangement/Authentication/Action";
import { useDispatch } from "react-redux";

const initialValues = {
	fullName: "",
	email: "",
	password: "",
	role: "ROLE_CUSTOMER",
};

const Registration = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = (values) => {
		console.log("Register form", values);
		dispatch(registerUser({ userData: values, navigate }));
	};
	const handleChange = () => {};
	return (
		<div>
			<Typography variant="h5" className="text-center">
				Register
			</Typography>
			<Formik onSubmit={handleSubmit} initialValues={initialValues}>
				<Form>
					<Field
						as={TextField}
						name="fullName"
						label="Full Name"
						fullWidth
						variant="outlined"
						margin="normal"
					/>
					<Field
						as={TextField}
						name="email"
						label="Email"
						type="email"
						fullWidth
						variant="outlined"
						margin="normal"
					/>
					<Field
						as={TextField}
						name="password"
						label="Password"
						type="password"
						fullWidth
						variant="outlined"
						margin="normal"
					/>
					<FormControl fullWidth margin="normal">
						<InputLabel id="role-simple-select-label">Role</InputLabel>
						<Field
							as={Select}
							name="role"
							labelId="role-simple-select-label"
							id="role-simple-select"
							label="Role"
						>
							<MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
							<MenuItem value={"ROLE_RESTAURANT_OWNER"}>
								Restaurant Owner
							</MenuItem>
						</Field>
					</FormControl>
					<Button
						fullWidth
						type="submit"
						variant="contained"
						sx={{ mt: 2, padding: "1rem" }}
					>
						Register
					</Button>
				</Form>
			</Formik>
			<Typography variant="body2" align="center" sx={{ mt: 2 }}>
				Already have an account ?
				<Button onClick={() => navigate("/account/login")}>Login</Button>
			</Typography>
		</div>
	);
};

export default Registration; */

import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../StateMangement/Authentication/Action";
import { useDispatch } from "react-redux";

const initialValues = {
	fullName: "",
	email: "",
	password: "",
	role: "ROLE_CUSTOMER",
};

// ✅ Validation Schema
const validationSchema = Yup.object({
	fullName: Yup.string().required("Full Name is required"),
	email: Yup.string()
		.matches(/^[A-Za-z0-9._%+-]+@gmail\.com$/, "Email must be valid Gmail")
		.required("Email is required"),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
	role: Yup.string().required("Role is required"),
});

const Registration = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = (values, { resetForm }) => {
		console.log("Register form", values);
		dispatch(registerUser({ userData: values, navigate }));
		resetForm();
	};

	return (
		<div>
			<Typography variant="h5" className="text-center">
				Register
			</Typography>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
				validateOnMount={true}
				validateOnChange={true}
				validateOnBlur={true}
			>
				{(formik) => (
					<form onSubmit={formik.handleSubmit}>
						{/* Full Name */}
						<TextField
							fullWidth
							label="Full Name"
							margin="normal"
							{...formik.getFieldProps("fullName")}
							error={formik.touched.fullName && Boolean(formik.errors.fullName)}
							helperText={formik.touched.fullName && formik.errors.fullName}
						/>

						{/* Email */}
						<TextField
							fullWidth
							label="Email"
							type="email"
							margin="normal"
							{...formik.getFieldProps("email")}
							error={formik.touched.email && Boolean(formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
						/>

						{/* Password */}
						<TextField
							fullWidth
							label="Password"
							type="password"
							margin="normal"
							{...formik.getFieldProps("password")}
							error={formik.touched.password && Boolean(formik.errors.password)}
							helperText={formik.touched.password && formik.errors.password}
						/>

						{/* Role */}
						<FormControl
							fullWidth
							margin="normal"
							error={formik.touched.role && Boolean(formik.errors.role)}
						>
							<InputLabel>Role</InputLabel>
							<Select label="Role" {...formik.getFieldProps("role")}>
								<MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
								<MenuItem value="ROLE_RESTAURANT_OWNER">
									Restaurant Owner
								</MenuItem>
							</Select>
						</FormControl>

						{/* Submit Button */}
						<Button
							fullWidth
							type="submit"
							variant="contained"
							sx={{ mt: 2, padding: "1rem" }}
							disabled={!(formik.isValid && formik.dirty)}
						>
							Register
						</Button>
					</form>
				)}
			</Formik>

			<Typography variant="body2" align="center" sx={{ mt: 2 }}>
				Already have an account ?
				<Button onClick={() => navigate("/account/login")}>Login</Button>
			</Typography>
		</div>
	);
};

export default Registration;
