import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../StateMangement/Authentication/Action";
import { useState } from "react";

const validationSchema = Yup.object({
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
	const initialValues = {
		email: "",
		password: "",
	};
	const [error, SetError] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (values, { resetForm }) => {
		//	console.log("Login form", values);
		setLoading(true);
		const isValidCredentials = await dispatch(
			loginUser({ userData: values, navigate }),
		);
		resetForm();
		SetError(!isValidCredentials);
		setLoading(false);
	};

	return (
		<div>
			<Typography variant="h5" className="text-center">
				Login
			</Typography>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
				validateOnMount={true}
			>
				{(formik) => (
					<form onSubmit={formik.handleSubmit}>
						<TextField
							fullWidth
							label="Email"
							margin="normal"
							{...formik.getFieldProps("email")}
							error={formik.touched.email && Boolean(formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
						/>

						<TextField
							fullWidth
							type="password"
							label="Password"
							margin="normal"
							{...formik.getFieldProps("password")}
							error={formik.touched.password && Boolean(formik.errors.password)}
							helperText={formik.touched.password && formik.errors.password}
						/>

						<Button
							fullWidth
							type="submit"
							variant="contained"
							sx={{ mt: 2, padding: "1rem" }}
							disabled={!(formik.isValid && formik.dirty)}
						>
							{loading ? (
								<>
									<CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
									Logging in...
								</>
							) : (
								"Login"
							)}
						</Button>
						{error && (
							<p className="text-red-600 text-center mt-2">
								Invalid Credentials
							</p>
						)}
					</form>
				)}
			</Formik>

			<Typography variant="body2" align="center" sx={{ mt: 2 }}>
				Don't have an account ?
				<Button onClick={() => navigate("/account/register")}>register</Button>
			</Typography>
		</div>
	);
};

export default LoginForm;
