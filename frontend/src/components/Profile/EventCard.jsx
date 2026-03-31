import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	IconButton,
	Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteEventAction } from "../../StateMangement/Restaurant/Action";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const EventCard = ({ event }) => {
	const role = localStorage.getItem("role")?.trim();
	const dispatch = useDispatch();
	const jwt = Cookies.get("jwt");

	const handleDeleteEvent = (id) => {
		dispatch(deleteEventAction({ eventId: id, jwt }));
	};

	return (
		<div className="rounded-lg hover:shadow-lg">
			<Card sx={{ width: 345 }}>
				<CardMedia sx={{ height: 345 }} image={event.image} />
				<CardContent>
					<Typography variant="h5">Event by {event.restaurantName}</Typography>
					<Typography variant="body2">{event.name}</Typography>
					<div className="py-2 space-y-2">
						<p>{event.location}</p>
						<p className="text-sm text-blue-500">
							{new Date(event.startTime).toLocaleString()}
						</p>
						<p className="text-sm text-red-500">
							{new Date(event.endTime).toLocaleString()}
						</p>
					</div>
				</CardContent>
				{role === "ROLE_RESTAURANT_OWNER" && (
					<CardActions>
						<IconButton
							variant="outlined"
							color="error"
							onClick={() => handleDeleteEvent(event.id)}
						>
							<DeleteIcon />
						</IconButton>
					</CardActions>
				)}
			</Card>
		</div>
	);
};

export default EventCard;
