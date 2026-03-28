import { Button, Card } from "@mui/material";

const OrderCard = ({ item, order }) => {
	return (
		<Card className="flex justify-between items-center p-5">
			<div className="flex items-center space-x-5">
				<img className="h-16 w-16" src={item.food.images[0]} alt="order-img" />
				<div>
					<p>{item.food.name}</p>
					<p>₹{item.totalPrice}</p>
				</div>
			</div>
			<div>
				<Button variant="contained" className="cursor-not-allowed">
					{order.orderStatus}
				</Button>
			</div>
		</Card>
	);
};

export default OrderCard;
