const CarousalItem = ({ item }) => {
	return (
		<div className="flex flex-col justify-center items-center">
			<img
				className="w-[10rem] h-[10rem] lg:h-[14rem] lg:w-[14rem] rounded-full object-cover object-center"
				src={item.image}
				alt={item.name}
			/>
			<span className="py-5 font-semibold text-xl text-gray-400">
				{item.name}
			</span>
		</div>
	);
};

export default CarousalItem;
