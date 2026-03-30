import { useState } from "react";
import ProfileNavigation from "./ProfileNavigation";
import UserProfile from "./UserProfile";
import { Navigate, Route, Routes } from "react-router-dom";
import Orders from "./Orders";
import Address from "./Address";
import Favorites from "./Favorites";
import Payments from "./Payments";
import Notifications from "./Notifications";
import Events from "./Events";
import NotFound from "../NotFound/NotFound";

const Profile = () => {
	const [openSideBar, setOpenSideBar] = useState(false);
	return (
		<div className="lg:flex justify-between">
			<div className="sticky h-[80vh] lg:w-[20%]">
				<ProfileNavigation open={openSideBar} />
			</div>
			<div className="lg:w-[80%]">
				<Routes>
					<Route index element={<UserProfile />} />
					<Route path="orders" element={<Orders />} />
					<Route path="address" element={<Address />} />
					<Route path="favorites" element={<Favorites />} />
					<Route path="payments" element={<Payments />} />
					<Route path="notifications" element={<Notifications />} />
					<Route path="events" element={<Events />} />
					<Route path="/not-found" element={<NotFound />} />
					<Route path="*" element={<Navigate to="/not-found" replace />} />
				</Routes>
			</div>
		</div>
	);
};

export default Profile;
