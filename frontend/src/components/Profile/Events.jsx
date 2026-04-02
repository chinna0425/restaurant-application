import { useEffect } from "react";
import EventCard from "./EventCard";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getAllEvents } from "../../StateMangement/Restaurant/Action";
import "./shared.css";
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
		<div className="mt-5 px-5 pb-5">
			{restaurant.events?.length > 0 ? (
				<div className="flex flex-wrap gap-5">
					{restaurant.events.map((event) => (
						<EventCard key={event.id} event={event} />
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
					<img
						src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?size=626&ext=jpg"
						alt="no-data"
						className="w-100 mb-5"
						loading="lazy"
					/>

					<p className="text-gray-400 text-lg">
						No events found. Check back later for updates!
					</p>
				</div>
			)}
		</div>
	);
};

export default Events;
