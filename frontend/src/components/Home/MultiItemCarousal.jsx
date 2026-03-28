import SlickSlider from "react-slick";
import CarousalItem from "./CarousalItem";
import { topMeal } from "./TopMeal";
const SliderComponent = SlickSlider.default || SlickSlider;
const MultiItemCarousal = () => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 1500,
	};
	return (
		<SliderComponent {...settings}>
			{topMeal.map((item) => (
				<CarousalItem key={item.id} item={item} />
			))}
		</SliderComponent>
	);
};
export default MultiItemCarousal;
