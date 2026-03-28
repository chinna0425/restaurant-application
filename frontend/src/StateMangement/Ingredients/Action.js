import { API_URL, Api } from "../../components/Api/Api";
import {
	CREATE_INGREDIENT_CATEGORY_SUCCESS,
	CREATE_INGREDIENT_SUCCESS,
	GET_INGREDIENT_CATEGORY_SUCCESS,
	GET_INGREDIENTS,
	UPDATE_STOCK,
} from "./ActionType";

export const getIngredientsOfRestaurant = ({ restaurantId, jwt }) => {
	return async (dispatch) => {
		try {
			const response = await Api.get(
				`/api/admin/ingredients/restaurant/${restaurantId}/ingredients`,
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				},
			);

			console.log("get all ingredients ", response.data);

			dispatch({
				type: GET_INGREDIENTS,
				payload: response.data, // Assuming the response contains the ingredients
			});
		} catch (error) {
			console.log("error", error);
		}
	};
};

export const createIngredient = ({ data, jwt }) => {
	return async (dispatch) => {
		try {
			const response = await Api.post(
				"/api/admin/ingredients/create-ingredient-item",
				data,
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				},
			);

			console.log("create ingredients ", response.data);

			dispatch({
				type: CREATE_INGREDIENT_SUCCESS,
				payload: response.data,
			});
		} catch (error) {
			console.log("error", error);
			// Handle error, dispatch an error action, etc.
		}
	};
};

export const createIngredientCategory = ({ data, jwt }) => {
	return async (dispatch) => {
		try {
			const response = await Api.post(
				"/api/admin/ingredients/create-category",
				data,
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				},
			);

			console.log("create ingredients category", response.data);

			dispatch({
				type: CREATE_INGREDIENT_CATEGORY_SUCCESS,
				payload: response.data,
			});
		} catch (error) {
			console.log("error", error);
		}
	};
};

export const getIngredientCategory = ({ id, jwt }) => {
	return async (dispatch) => {
		try {
			const response = await Api.get(
				`/api/admin/ingredients/restaurant/${id}/category`,
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				},
			);

			console.log("get ingredients category", response.data);

			dispatch({
				type: GET_INGREDIENT_CATEGORY_SUCCESS,
				payload: response.data,
			});
		} catch (error) {
			console.log("error", error);
		}
	};
};

export const updateStockOfIngredient = ({ id, jwt }) => {
	return async (dispatch) => {
		try {
			const { data } = await Api.put(
				`/api/admin/ingredients/${id}/update-stock`,
				{},
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				},
			);

			dispatch({
				type: UPDATE_STOCK,
				payload: data,
			});

			console.log("update ingredients stock ", data);
		} catch (error) {
			console.log("error ", error);
		}
	};
};
