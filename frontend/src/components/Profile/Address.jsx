import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderedAddresses } from "../../StateMangement/Authentication/Action";
import AddressCard from "../Cart/AddressCard";
import "./shared.css";

const Address = () => {
	const auth = useSelector((store) => store.auth);
	const jwt = Cookies.get("jwt");
	const dispatch = useDispatch();
	useEffect(() => {
		if (jwt) {
			dispatch(getUserOrderedAddresses(jwt));
		}
	}, []);

	return (
		<div className="p-5">
			<h1 className="text-2xl font-semibold text-white mb-5">
				Ordered Addresses
			</h1>
			<div className="flex gap-5 flex-wrap justify-center">
				{auth.addresses?.length > 0 ? (
					auth.addresses?.map((address) => (
						<AddressCard key={address.id} address={address} />
					))
				) : (
					<div className="home-data-notfound-container">
						<img
							src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?size=626&ext=jpg"
							alt="no-data"
							className="no-data-image"
							loading="lazy"
						/>

						<p className="text-gray-400 text-lg mt-5">
							No ordered addresses found. Start placing orders to see your
							delivery addresses here!
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Address;
