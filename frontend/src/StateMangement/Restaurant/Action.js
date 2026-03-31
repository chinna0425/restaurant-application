import { Api } from "../../components/Api/Api";
import {
	CREATE_CATEGORY_FAILURE,
	CREATE_CATEGORY_REQUEST,
	CREATE_CATEGORY_SUCCESS,
	CREATE_EVENTS_FAILURE,
	CREATE_EVENTS_REQUEST,
	CREATE_EVENTS_SUCCESS,
	CREATE_RESTAURANT_FAILURE,
	CREATE_RESTAURANT_REQUEST,
	CREATE_RESTAURANT_SUCCESS,
	DELETE_EVENTS_FAILURE,
	DELETE_EVENTS_REQUEST,
	DELETE_EVENTS_SUCCESS,
	DELETE_RESTAURANT_FAILURE,
	DELETE_RESTAURANT_REQUEST,
	DELETE_RESTAURANT_SUCCESS,
	GET_ALL_EVENTS_FAILURE,
	GET_ALL_EVENTS_REQUEST,
	GET_ALL_EVENTS_SUCCESS,
	GET_ALL_RESTAURANT_FAILURE,
	GET_ALL_RESTAURANT_REQUEST,
	GET_ALL_RESTAURANT_SUCCESS,
	GET_RESTAURANT_BY_ID_FAILURE,
	GET_RESTAURANT_BY_ID_REQUEST,
	GET_RESTAURANT_BY_ID_SUCCESS,
	GET_RESTAURANT_BY_USER_ID_REQUEST,
	GET_RESTAURANT_BY_USER_ID_SUCCESS,
	GET_RESTAURANTS_CATEGORY_FAILURE,
	GET_RESTAURANTS_CATEGORY_REQUEST,
	GET_RESTAURANTS_CATEGORY_SUCCESS,
	GET_RESTAURANTS_EVENTS_FAILURE,
	GET_RESTAURANTS_EVENTS_REQUEST,
	GET_RESTAURANTS_EVENTS_SUCCESS,
	UPDATE_RESTAURANT_STATUS_FAILURE,
	UPDATE_RESTAURANT_STATUS_REQUEST,
	UPDATE_RESTAURANT_STATUS_SUCCESS,
} from "./ActionType";

export const getAllRestaurantsAction = (token) => {
	return async (dispatch) => {
		dispatch({ type: GET_ALL_RESTAURANT_REQUEST });
		try {
			const { data } = await Api.get(`/api/restaurant/all-restaurants`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: data });
			console.log("getAllRestaurantsAction", data);
		} catch (error) {
			console.log("GetAllRestaurantsAction", error);
			dispatch({ type: GET_ALL_RESTAURANT_FAILURE, payload: error });
		}
	};
};

export const getRestaurantById = (reqData) => {
	return async (dispatch) => {
		dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
		try {
			const response = await Api.get(
				`/api/restaurant/${reqData.restaurantId}`,
				{
					headers: {
						Authorization: `Bearer ${reqData.jwt}`,
					},
				},
			);
			dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data });
			console.log("getRestaurantById", response.data);
		} catch (error) {
			console.log("getRestaurantById", error);
			dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
		}
	};
};

export const getRestaurantByUserId = (jwt) => {
	return async (dispatch) => {
		dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
		try {
			const { data } = await Api.get(`/api/admin/restaurants/user`, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
			console.log("GetRestaurantByUserId", data);
		} catch (error) {
			console.log("getRestaurantById", error);
			dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error.message });
		}
	};
};

export const createRestaurant = (reqData) => {
	console.log("Token----------", reqData.token);
	return async (dispatch) => {
		dispatch({ type: CREATE_RESTAURANT_REQUEST });
		try {
			const { data } = await Api.post(
				`/api/admin/restaurants/create`,
				reqData.data,
				{
					headers: {
						Authorization: `Bearer ${reqData.token}`,
					},
				},
			);
			dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
			console.log("Created Restaurant", data);
		} catch (error) {
			console.log("Catch error", error);
			dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error });
		}
	};
};

export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => {
	return async (dispatch) => {
		dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
		try {
			const res = await Api.put(
				`/api/admin/restaurant/${restaurantId}`,
				restaurantData,
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				},
			);
			dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
			console.log("Created Restaurant", res.data);
		} catch (error) {
			console.log("Catch error", error);
			dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
		}
	};
};

export const deleteRestaurant = ({ restaurantId, jwt }) => {
	return async (dispatch) => {
		dispatch({ type: DELETE_RESTAURANT_REQUEST });
		try {
			const res = await Api.delete(`/api/admin/restaurant/${restaurantId}`, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
			console.log("delete Restaurant", restaurantId);
		} catch (error) {
			console.log("Catch error", error);
			dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
		}
	};
};

export const updateRestaurantStatus = ({ restaurantId, jwt }) => {
	return async (dispatch) => {
		dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
		try {
			const res = await Api.put(
				`/api/admin/restaurants/update/${restaurantId}/status`,

				{},
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				},
			);
			dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
			console.log("update status Restaurant", res.data);
		} catch (error) {
			console.log("Catch error", error);
			dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
		}
	};
};

export const createEventAction = ({ data, jwt, restaurantId }) => {
	return async (dispatch) => {
		dispatch({ type: CREATE_EVENTS_REQUEST });
		try {
			const res = await Api.post(
				`/admin/event/restaurant/${restaurantId}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				},
			);
			dispatch({ type: CREATE_EVENTS_SUCCESS, payload: res.data });
			console.log("Created Event of Restaurant", res.data);
		} catch (error) {
			console.log("Catch error", error);
			dispatch({ type: CREATE_EVENTS_FAILURE, payload: error });
		}
	};
};

export const getAllEvents = ({ jwt }) => {
	return async (dispatch) => {
		dispatch({ type: GET_ALL_EVENTS_REQUEST });
		try {
			const res = await Api.get(`/api/events`, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: res.data });
			console.log("Get All events", res.data);
		} catch (error) {
			console.log("Get All Events Error", error);
			dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: error });
		}
	};
};

export const deleteEventAction = ({ eventId, jwt }) => {
	return async (dispatch) => {
		dispatch({ type: DELETE_EVENTS_REQUEST });
		try {
			const res = await Api.delete(`/admin/event/${eventId}`, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			dispatch({ type: DELETE_EVENTS_SUCCESS, payload: eventId });
			console.log("delete events", eventId);
		} catch (error) {
			console.log("Catch error", error);
			dispatch({ type: DELETE_EVENTS_FAILURE, payload: error });
		}
	};
};

export const getRestaurantEvents = ({ restaurantId, jwt }) => {
	return async (dispatch) => {
		dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });
		try {
			const res = await Api.get(`/admin/event/restaurant/${restaurantId}`, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			dispatch({ type: GET_RESTAURANTS_EVENTS_SUCCESS, payload: res.data });
			console.log("Get restaurants events", res.data);
		} catch (error) {
			console.log("Get All Events Error", error);
			dispatch({ type: GET_RESTAURANTS_EVENTS_FAILURE, payload: error });
		}
	};
};

export const createCategoryAction = ({ reqData, jwt }) => {
	return async (dispatch) => {
		dispatch({ type: CREATE_CATEGORY_REQUEST });
		try {
			const res = await Api.post(`/api/admin/category/create`, reqData, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
			console.log("Created Category", res.data);
		} catch (error) {
			console.log("Catch error", error);
			dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
		}
	};
};

export const getRestaurantsCategory = ({ jwt, restaurantId }) => {
	return async (dispatch) => {
		dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
		try {
			const res = await Api.get(`/api/category/restaurant/${restaurantId}`, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: res.data });
			console.log("Get restaurants category", res.data);
		} catch (error) {
			console.log("Get All restaurant category Error", error);
			dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: error });
		}
	};
};
