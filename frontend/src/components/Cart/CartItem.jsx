import { Chip, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	removeCartItem,
	updateCartItem,
} from "../../StateMangement/Cart/Action";
import Cookies from "js-cookie";

const CartItem = ({ item }) => {
	const navigate = useNavigate();
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const jwt = Cookies.get("jwt");

	const handleUpdateCartItem = (value) => {
		if (value === -1 && item.quantity === 1) {
			handleRemoveCartItem();
		} else {
			const data = { cartItemId: item.id, quantity: item.quantity + value };
			dispatch(updateCartItem({ data, jwt }));
		}
	};

	const handleRemoveCartItem = () => {
		dispatch(removeCartItem({ cartItemId: item.id, jwt: auth.jwt || jwt }));
	};

	return (
		<div className="px-5">
			<div className="lg:flex items-center lg:space-x-5">
				<div>
					<img
						className="w-[5rem] h-[5rem] object-cover"
						src={item.food.images[0]}
						alt="cart-item"
					/>
				</div>
				<div className="flex items-center justify-between lg:w-[70%]">
					<div className="space-y-1 lg:space-y-3 w-full">
						<p className="pl-2.5">{item.food.name}</p>
						<div className="flex justify-between items-center">
							<div className="flex items-center space-x-1">
								<IconButton onClick={() => handleUpdateCartItem(-1)}>
									<RemoveCircleOutlineIcon />
								</IconButton>
								<div className="w-5 h-5 text-xs flex items-center justify-center">
									{item.quantity}
								</div>
								<IconButton onClick={() => handleUpdateCartItem(1)}>
									<AddCircleOutlineIcon />
								</IconButton>
							</div>
						</div>
					</div>
					<p>₹{item.totalPrice}</p>
				</div>
			</div>
			<div className="pt-3 space-x-2">
				{item.ingredients.map((each, index) => (
					<Chip label={each} key={index} />
				))}
			</div>
		</div>
	);
};

export default CartItem;
