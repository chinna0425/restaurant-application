import { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders } from "../../StateMangement/Order/Action";
import Cookies from "js-cookie";

const Orders = () => {
	const order = useSelector((store) => store.order);
	const jwt = Cookies.get("jwt");
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsersOrders(jwt));
	}, []);
	return (
		<div className="flex items-center flex-col">
			<h1 className="text-xl text-center py-7 font-semibold">My Orders</h1>
			<div className="space-y-5 w-full lg:w-1/2">
				{order.orders.map((order) =>
					order.items.map((item) => (
						<OrderCard key={item} item={item} order={order} />
					)),
				)}
			</div>
		</div>
	);
};

export default Orders;
