import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import categorizeIngredients from "../util/categorizeIngredients";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../StateMangement/Cart/Action";
const ingredients = [
	{
		category: "Nuts & Seeds",
		items: ["Almonds", "Cashews", "Pistachios", "Walnuts"],
	},
	{ category: "Proteins", items: ["Chicken", "Beef", "Tofu", "Lentils"] },
	{
		category: "bread",
		items: ["Naan", "Roti", "Paratha"],
	},
	{
		category: "Vegetables",
		items: ["Onions", "Tomatoes", "Spinach", "Peppers"],
	},
];
const MenuCard = ({ item }) => {
	const [selectedIngredients, setSelectedIngredients] = useState([]);
	const dispatch = useDispatch();
	const handleCheckBoxChange = (value) => {
		console.log(value);
		if (selectedIngredients.includes(value)) {
			setSelectedIngredients(
				selectedIngredients.filter((eachIngre) => eachIngre !== value),
			);
		} else {
			setSelectedIngredients([...selectedIngredients, value]);
		}
	};

	const handleAddItemToCart = (event) => {
		event.preventDefault();
		const jwt = localStorage.getItem("jwt");
		const reqData = {
			jwt: jwt,
			cartItem: {
				foodId: item.id,
				quantity: 1,
				ingredients: selectedIngredients,
			},
		};
		dispatch(addItemToCart(reqData));
		console.log("Add Item To cart", reqData);
	};

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1-content"
				id="panel1-header"
			>
				<div className="lg:flex items-center justify-between">
					<div className="lg:flex items-center lg:gap-5">
						<img
							src={item.images[0]}
							alt="menu item"
							className="w-[7rem] h-[7rem] object-cover rounded-sm"
						/>
						<div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
							<p className="font-semibold text-xl">{item.name}</p>
							<p>₹{item.price}</p>
							<p className="text-gray-400">{item.description}</p>
						</div>
					</div>
				</div>
			</AccordionSummary>
			<AccordionDetails>
				<form>
					<div className="flex gap-5 flex-wrap">
						{Object.keys(categorizeIngredients(item.ingredients)).map(
							(category) => (
								<div key={category}>
									<p>{category}</p>
									<FormGroup>
										{categorizeIngredients(item.ingredients)[category].map(
											(ingredient) => (
												<FormControlLabel
													key={ingredient.name}
													control={
														<Checkbox
															onChange={() =>
																handleCheckBoxChange(ingredient.name)
															}
														/>
													}
													label={ingredient.name}
												/>
											),
										)}
									</FormGroup>
								</div>
							),
						)}
					</div>
					<div className="pt-5">
						<Button
							onClick={handleAddItemToCart}
							type="submit"
							variant="contained"
							disabled={false}
						>
							{true ? "Add to Cart" : "Out Of Stock"}
						</Button>
					</div>
				</form>
			</AccordionDetails>
		</Accordion>
	);
};

export default MenuCard;
