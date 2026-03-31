import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderedAddresses } from "../../StateMangement/Authentication/Action";
import AddressCard from "../Cart/AddressCard";

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
				{auth.addresses?.map((address) => (
					<AddressCard key={address.id} address={address} />
				))}
			</div>
		</div>
	);
};

export default Address;
