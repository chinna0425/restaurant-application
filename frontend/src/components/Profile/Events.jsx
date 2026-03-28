import EventCard from "./EventCard";
const Events = () => {
	return (
		<div className="mt-5 px-5 flex justify-between flex-wrap gap-5">
			{[1, 2, 3, 4].map((card, idx) => (
				<EventCard key={idx} />
			))}
		</div>
	);
};

export default Events;
