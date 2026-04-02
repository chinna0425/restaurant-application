import axios from "axios";
import Cookies from "js-cookie";
import { API_URL, Api } from "../../components/Api/Api";
import {
	ADD_TO_FAVORITE_FAILURE,
	ADD_TO_FAVORITE_REQUEST,
	ADD_TO_FAVORITE_SUCCESS,
	GET_USER_FAILURE,
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	LOGIN_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT,
	REGISTER_FAILURE,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	USER_ORDERED_ADDRESSES_FAILURE,
	USER_ORDERED_ADDRESSES_REQUEST,
	USER_ORDERED_ADDRESSES_SUCCESS,
} from "./ActionType";

export const registerUser = (reqData) => async (dispatch) => {
	dispatch({ type: REGISTER_REQUEST });
	try {
		const { data } = await axios.post(
			`${API_URL}/auth/signup`,
			reqData.userData,
		);

		dispatch({ type: REGISTER_SUCCESS });
		reqData.navigate("/account/login");
		return true;
	} catch (error) {
		dispatch({ type: REGISTER_FAILURE, payload: error });
		console.log("Error", error);
		return false;
	}
};

export const loginUser = (reqData) => async (dispatch) => {
	dispatch({ type: LOGIN_REQUEST });
	try {
		const { data } = await axios.post(
			`${API_URL}/auth/signin`,
			reqData.userData,
		);
		// console.log(data);
		if (data.token) {
			const expirationTime = 86400000; // 24 hours in ms

			const expiryDate = new Date(new Date().getTime() + expirationTime);

			Cookies.set("jwt", data.token, {
				expires: expiryDate,
				secure: true,
				sameSite: "Strict",
			});
			localStorage.setItem("role", data.role);
		}
		if (data.role === "ROLE_RESTAURANT_OWNER") {
			reqData.navigate("/admin/restaurants");
		} else {
			reqData.navigate("/");
		}
		dispatch({ type: LOGIN_SUCCESS, payload: data.token });
		return true;
	} catch (error) {
		dispatch({ type: LOGIN_FAILURE, payload: error });
		console.log("Error", error);
		return false;
	}
};

export const getUser = (jwt) => async (dispatch) => {
	dispatch({ type: GET_USER_REQUEST });
	try {
		const { data } = await axios.get(`${API_URL}/api/user/profile`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});

		dispatch({ type: GET_USER_SUCCESS, payload: data });
		console.log("User profile data", data);
	} catch (error) {
		dispatch({ type: GET_USER_FAILURE, payload: error });
		console.log("Error", error);
	}
};

export const getUserOrderedAddresses = (jwt) => async (dispatch) => {
	dispatch({ type: USER_ORDERED_ADDRESSES_REQUEST });
	try {
		const { data } = await axios.get(`${API_URL}/api/user/ordered-addresses`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});
		console.log("----users ordereds----", data);
		dispatch({ type: USER_ORDERED_ADDRESSES_SUCCESS, payload: data });
		console.log("User profile data", data);
	} catch (error) {
		dispatch({ type: USER_ORDERED_ADDRESSES_FAILURE, payload: error });
		console.log("Error", error);
	}
};

// handling favorite select and unselect in backend
export const addToFavorite =
	({ jwt, restaurantId }) =>
	async (dispatch) => {
		dispatch({ type: ADD_TO_FAVORITE_REQUEST });

		try {
			const { data } = await Api.put(
				`/api/restaurant/${restaurantId}/add-favourites`,
				{},
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				},
			);

			dispatch({
				type: ADD_TO_FAVORITE_SUCCESS,
				payload: data,
			});

			console.log("Added to favorite data", data);
		} catch (error) {
			dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error });
			console.log("Error", error);
		}
	};

export const logOut = () => async (dispatch) => {
	try {
		Cookies.remove("jwt");
		localStorage.removeItem("role");
		dispatch({ type: LOGOUT });
	} catch (error) {
		console.log("Error", error);
	}
};
