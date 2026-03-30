import { Link } from "react-router-dom";
import "./index.css";
import { Button } from "@mui/material";

const NotFound = () => {
	const role = localStorage.getItem("role")?.trim();
	return (
		<div className="not-found-page-container">
			<img
				src="https://res.cloudinary.com/chinna25/image/upload/v1694067333/Group_1_f33dke.png"
				alt="not-found"
				loading="lazy"
			/>
			<h1 className="text-2xl mt-3">Page Not Found</h1>
			<p className="text-xl mt-2">
				We are sorry,the page you requested could not be found.
			</p>
			<p className="text-xl mt-3">Please go back to the homepage.</p>
			<Link
				to={`${role === "ROLE_CUSTOMER" ? "/" : "/admin/restaurants"}`}
				className="mt-5"
			>
				<Button variant="contained" type="button">
					Home Page
				</Button>
			</Link>
		</div>
	);
};
export default NotFound;
