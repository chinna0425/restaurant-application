import React from "react";
import { useNavigate } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { logOut } from "../../StateMangement/Authentication/Action";
import { Home } from "@mui/icons-material";

const menu = [
	{ id: 1, title: "Orders", icon: <ShoppingBagIcon /> },
	{ id: 2, title: "Favorites", icon: <FavoriteIcon /> },
	{ id: 3, title: "Address", icon: <Home /> },
	{ id: 4, title: "Payments", icon: <AccountBalanceWalletIcon /> },
	{ id: 5, title: "Notifications", icon: <NotificationsActiveIcon /> },
	{ id: 6, title: "Events", icon: <EventIcon /> },
	{ id: 7, title: "Logout", icon: <LogoutIcon /> },
];
const ProfileNavigation = ({ open, handleClose }) => {
	const isSmallScreen = useMediaQuery("(max-width:900px)");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleNavigate = (item) => {
		if (item.title === "Logout") {
			dispatch(logOut());
			navigate("/account/login");
		} else {
			navigate(`/my-profile/${item.title.toLowerCase()}`);
		}
	};

	return (
		<div>
			<Drawer
				sx={{ zIndex: -1 }}
				open={isSmallScreen ? open : true}
				onClose={handleClose}
				variant="permanent"
				anchor="left"
			>
				<div className="w-[50vw] lg:w-[20vw] h-[100vh] pt-18 flex flex-col justify-center text-xl gap-8">
					{menu.map((item, i) => (
						<React.Fragment key={item.id}>
							<div
								onClick={() => handleNavigate(item)}
								className="px-5 flex items-center space-x-5 cursor-pointer"
							>
								{item.icon}
								<span>{item.title}</span>
							</div>
							{i !== menu.length - 1 && <Divider />}
						</React.Fragment>
					))}
				</div>
			</Drawer>
		</div>
	);
};

export default ProfileNavigation;
