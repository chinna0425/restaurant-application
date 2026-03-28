import { Dashboard, ShoppingBag } from "@mui/icons-material";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import EventIcon from "@mui/icons-material/Event";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../StateMangement/Authentication/Action";

const menu = [
	{ id: 1, title: "Dashboard", icon: <Dashboard />, path: "/" },
	{ id: 2, title: "Orders", icon: <ShoppingBag />, path: "/orders" },
	{ id: 3, title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
	{
		id: 4,
		title: "FoodCategory",
		icon: <CategoryIcon />,
		path: "/food-category",
	},
	{ id: 5, title: "Ingredients", icon: <FastfoodIcon />, path: "/ingredients" },
	{ id: 6, title: "Events", icon: <EventIcon />, path: "/event" },
	{
		id: 7,
		title: "Details",
		icon: <AdminPanelSettingsIcon />,
		path: "/details",
	},
	{ id: 8, title: "Logout", icon: <LogoutIcon />, path: "/" },
];

const AdminSideBar = ({ handleClose }) => {
	const isSmallScreen = useMediaQuery("(max-width:1080px");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleNavigate = (item) => {
		navigate(`/admin/restaurants${item.path}`);
		if (item.title === "Logout") {
			dispatch(logOut());
			navigate("/account/login");
			handleClose();
		}
	};

	return (
		<div>
			<Drawer
				variant={isSmallScreen ? "temporary" : "permanent"}
				onClose={handleClose}
				open={true}
				anchor="left"
				sx={{ zIndex: 1 }}
			>
				<div className="w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-between text-xl space-y-[1.65rem] pt-6 pb-6">
					{menu.map((item) => (
						<Fragment key={item.id}>
							<div
								onClick={() => handleNavigate(item)}
								className="px-5 flex items-center mb-0 gap-5 cursor-pointer"
							>
								{item.icon}
								<span>{item.title}</span>
							</div>
							{item.id !== menu.length && <Divider />}
						</Fragment>
					))}
				</div>
			</Drawer>
		</div>
	);
};

export default AdminSideBar;
