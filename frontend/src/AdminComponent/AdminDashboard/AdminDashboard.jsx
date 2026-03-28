import { Grid } from "@mui/material";
import MenuTable from "../Menu/MenuTable";
import OrderTable from "../Orders/OrderTable";

const AdminDashboard = () => {
	return (
		<div>
			<Grid container spacing={2}>
				<Grid size={{ xs: 12, lg: 6 }}>
					<MenuTable />
				</Grid>
				<Grid size={{ xs: 12, lg: 6 }}>
					<OrderTable />
				</Grid>
			</Grid>
		</div>
	);
};

export default AdminDashboard;
