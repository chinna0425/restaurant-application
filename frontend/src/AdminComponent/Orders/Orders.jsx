import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	Card,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material";
import OrderTable from "./OrderTable";

const orderStatus = [
	{
		id: 1,
		label: "Pending",
		value: "PENDING",
	},
	{
		id: 2,
		label: "Completed",
		value: "COMPLETED",
	},
	{
		id: 3,
		label: "All",
		value: "ALL",
	},
];

const Orders = () => {
	const [filterValue, setFilterValue] = useState("ALL");
	const handleFilter = (event, value) => {
		setFilterValue(value);
	};
	return (
		<div className="px-2">
			<Card className="p-5">
				<Typography sx={{ paddingBottom: "1rem" }} variant="h5">
					Order Status
				</Typography>
				<FormControl>
					<RadioGroup
						onChange={handleFilter}
						row
						name="category"
						value={filterValue}
					>
						{orderStatus.map((item) => (
							<FormControlLabel
								key={item.id}
								value={item.value}
								control={<Radio />}
								label={item.label}
								sx={{ color: "gray" }}
							/>
						))}
					</RadioGroup>
				</FormControl>
			</Card>
			<OrderTable />
		</div>
	);
};

export default Orders;
