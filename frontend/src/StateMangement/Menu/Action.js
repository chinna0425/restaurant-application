import { API_URL, Api } from "../../components/Api/Api";
import {
	CREATE_MENU_ITEM_FAILURE,
	CREATE_MENU_ITEM_REQUEST,
	CREATE_MENU_ITEM_SUCCESS,
	DELETE_MENU_ITEM_FAILURE,
	DELETE_MENU_ITEM_REQUEST,
	DELETE_MENU_ITEM_SUCCESS,
	GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
	GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
	GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
	SEARCH_MENU_ITEM_FAILURE,
	SEARCH_MENU_ITEM_REQUEST,
	SEARCH_MENU_ITEM_SUCCESS,
	UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
	UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
	UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
} from "./ActionType";

export const createMenuItem = ({ menu, jwt }) => {
	return async (dispatch) => {
		dispatch({ type: CREATE_MENU_ITEM_REQUEST });
		try {
			const { data } = await Api.post("/api/admin/food/create", menu, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			console.log("Created Menu", data);
			dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data });
		} catch (error) {
			console.log("catch error", error);
			dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error });
		}
	};
};

export const getMenuItemsByRestaurantId = (reqData) => {
	return async (dispatch) => {
		dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });

		try {
			const {
				restaurantId,
				vegetarian = false,
				nonVeg = false,
				seasonal = false,
				foodCategory = "",
				jwt,
			} = reqData;

			const { data } = await Api.get(
				`/api/food/${restaurantId}?vegetarian=${vegetarian}&nonVeg=${nonVeg}&seasonal=${seasonal}&foodCategory=${foodCategory}`,
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				},
			);

			console.log("getMenuItemsByRestaurantId", data);

			dispatch({
				type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
				payload: data,
			});
		} catch (error) {
			console.log("getMenuItemsByRestaurantId error", error);

			dispatch({
				type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
				payload: error,
			});
		}
	};
};

export const searchMenuItem = ({ keyword, jwt }) => {
	return async (dispatch) => {
		dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
		try {
			const { data } = await Api.get(`/api/food/search?name=${keyword}`, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			console.log(".....data......", data);
			dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
		} catch (error) {
			console.log("catch error", error);
			dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error });
		}
	};
};

export const updateMenuItemsAvailability = ({ foodId, jwt }) => {
	return async (dispatch) => {
		dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
		try {
			const { data } = await Api.put(
				`/api/admin/food/${foodId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				},
			);
			console.log(".....updated menuitems availability......", data);
			dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: data });
		} catch (error) {
			console.log("catch error", error);
			dispatch({
				type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
				payload: error,
			});
		}
	};
};

export const deleteFoodAction = ({ foodId, jwt }) => {
	return async (dispatch) => {
		dispatch({ type: DELETE_MENU_ITEM_REQUEST });
		try {
			const { data } = await Api.delete(`/api/admin/food/${foodId}`, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			console.log(".....delete food......", data);
			dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: foodId });
		} catch (error) {
			console.log("catch error", error);
			dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error });
		}
	};
};
