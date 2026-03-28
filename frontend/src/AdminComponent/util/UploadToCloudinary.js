const upload_preset = "Tasty-Food";

const cloud_name = "dakxyhuei";

export const uploadImageToCloudinary = async (file) => {
	const data = new FormData();
	data.append("file", file);
	data.append("upload_preset", upload_preset);
	data.append("cloud_name", cloud_name);

	try {
		const res = await fetch(
			`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
			{
				method: "POST",
				body: data,
			},
		);

		const result = await res.json();
		return result.secure_url; // this is image URL
	} catch (error) {
		console.error("Upload failed:", error);
	}
};
