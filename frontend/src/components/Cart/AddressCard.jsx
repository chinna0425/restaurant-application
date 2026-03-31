import HomeIcon from "@mui/icons-material/Home";
import { Button, Card } from "@mui/material";

const AddressCard = ({ address }) => {
	return (
		<Card className="flex gap-5 w-64 p-5">
			<HomeIcon />
			<div className="space-y-3 text-gray-500">
				<h1 className="font-semibold text-lg text-white">Home</h1>
				<h1 className="text-lg text-gray-400">Country: {address?.country}</h1>
				<h1 className="text-lg text-gray-400">
					State: {address?.stateProvince}
				</h1>
				<h1 className="text-lg text-gray-400">
					Street:{" "}
					{address?.streetAddress?.length > 30
						? address.streetAddress.substring(0, 30) + "..."
						: address?.streetAddress}
				</h1>
				<h1 className="text-lg text-gray-400">
					Zipcode: {address?.postalCode}
				</h1>
			</div>
		</Card>
	);
};

export default AddressCard;
