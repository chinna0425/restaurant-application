import { Grid } from "@mui/material";
import IngredientTable from "./IngredientTable";
import IngredientCategoryTable from "./IngredientCategoryTable";

const Ingredients = () => {
	return (
		<div className="px-2">
			<Grid container spacing={2}>
				<Grid size={{ xs: 12, lg: 8 }}>
					<IngredientTable />
				</Grid>
				<Grid size={{ xs: 12, lg: 4 }}>
					<IngredientCategoryTable />
				</Grid>
			</Grid>
		</div>
	);
};

export default Ingredients;
