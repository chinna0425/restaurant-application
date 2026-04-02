import { Avatar, Badge, IconButton, InputBase } from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { pink } from "@mui/material/colors";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { Person } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getRestaurantByUserQuery } from "../../StateMangement/Restaurant/Action";
import Cookies from "js-cookie";
const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	width: "100%",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		[theme.breakpoints.up("sm")]: {
			width: "17ch",
			"&:focus": {
				width: "27ch",
			},
		},
	},
}));

const Navbar = () => {
	const navigate = useNavigate();
	const auth = useSelector((store) => store.auth);
	const cart = useSelector((store) => store.cart);
	const [searchQuery, setSearchQuery] = useState("");
	const jwt = Cookies.get("jwt");
	const handleAvatarClick = () => {
		if (auth.user?.role === "ROLE_CUSTOMER") {
			navigate("/my-profile");
		} else {
			navigate("/admin/restaurant");
		}
	};

	const dispatch = useDispatch();

	const handleOnSubmitSearch = () => {
		if (searchQuery.trim() !== "") {
			dispatch(getRestaurantByUserQuery({ query: searchQuery, jwt }));
		}
	};

	return (
		<div className="px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between">
			<div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
				<li
					onClick={() => navigate("/")}
					className="logo font-semibold text-gray-300 text-2xl"
				>
					Tasty Kitchens
				</li>
			</div>
			<div className="flex items-center space-x-2 lg:space-x-10">
				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="Search by restaurant or cuisine..."
						inputProps={{ "aria-label": "search" }}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleOnSubmitSearch();
							}
						}}
					/>
				</Search>
				<div className="">
					{auth.user ? (
						<Avatar
							onClick={handleAvatarClick}
							sx={{ bgcolor: "white", color: pink.A400, cursor: "pointer" }}
						>
							{auth.user?.fullName?.charAt(0)?.toUpperCase()}
						</Avatar>
					) : (
						<IconButton onClick={() => navigate("/account/login")}>
							<Person sx={{ cursor: "pointer" }} />
						</IconButton>
					)}
				</div>
				<div className="">
					<IconButton onClick={() => navigate("/cart")}>
						<Badge color="primary" badgeContent={cart.cartItems?.length}>
							<ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
						</Badge>
					</IconButton>
				</div>
			</div>
		</div>
	);
};
export default Navbar;
