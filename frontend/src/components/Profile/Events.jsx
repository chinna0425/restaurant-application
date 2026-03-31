import { useEffect } from "react";
import EventCard from "./EventCard";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getAllEvents } from "../../StateMangement/Restaurant/Action";
const Events = () => {
	const jwt = Cookies.get("jwt");
	const dispatch = useDispatch();
	const restaurant = useSelector((store) => store.restaurant);
	useEffect(() => {
		if (jwt) {
			dispatch(
				getAllEvents({
					jwt,
				}),
			);
		}
	}, []);
	return (
		<div className="mt-5 px-5 flex justify-space-between flex-wrap gap-5 pb-5">
			{restaurant.events.map((event, idx) => (
				<EventCard key={event.id} event={event} />
			))}
		</div>
	);
};

export default Events;
