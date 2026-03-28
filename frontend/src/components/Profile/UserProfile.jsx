import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logOut } from "../../StateMangement/Authentication/Action";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogout = () => {
		dispatch(logOut());
		navigate("/account/login");
	};

	return (
		<div className="min-h-[80vh] flex flex-col justify-center items-center">
			<div className="flex flex-col items-center justify-center">
				<AccountCircleIcon sx={{ fontSize: "9rem" }} />
				<h1 className="py-5 text-2xl font-semibold">Kiran Kandula</h1>
				<p>Email: kiran25@gmail.com</p>
				<Button
					variant="contained"
					onClick={handleLogout}
					sx={{ margin: "2rem 0rem" }}
				>
					LogOut
				</Button>
			</div>
		</div>
	);
};

export default UserProfile;
