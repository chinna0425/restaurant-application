import { Box, Modal } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Registration from "./Registration";
import LoginForm from "./LoginForm";
const Auth = () => {
	const location = useLocation();
	const navigate = useNavigate();
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
	const handleOnClose = () => {
		navigate("/");
	};
	return (
		<>
			<Modal
				open={
					location.pathname === "/account/register" ||
					location.pathname === "/account/login"
				}
				onClose={handleOnClose}
			>
				<Box sx={style}>
					{location.pathname === "/account/register" ? (
						<Registration />
					) : (
						<LoginForm />
					)}
				</Box>
			</Modal>
		</>
	);
};

export default Auth;
