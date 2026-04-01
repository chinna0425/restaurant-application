import { isPresentInFavorites } from "../../components/config/logic";
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

const initialState = {
	user: null,
	loading: false,
	error: null,
	jwt: null,
	favorites: [],
	success: null,
	addresses: [],
};
export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_REQUEST:
		case LOGIN_REQUEST:
		case GET_USER_REQUEST:
		case USER_ORDERED_ADDRESSES_REQUEST:
		case ADD_TO_FAVORITE_REQUEST:
			return { ...state, isLoading: true, error: null, success: null };
		case REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				jwt: null,
				success: "Register Success",
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				jwt: action.payload,
				success: "Login Success",
			};
		case GET_USER_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload,
				favorites: action.payload.favourites,
			};
		case USER_ORDERED_ADDRESSES_SUCCESS:
			return {
				...state,
				loading: false,
				addresses: action.payload,
			};

		case ADD_TO_FAVORITE_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				favorites: isPresentInFavorites(state.favorites, action.payload)
					? state.favorites.filter((item) => item.id !== action.payload.id)
					: [action.payload, ...state.favorites],
			};

		case REGISTER_FAILURE:
		case LOGIN_FAILURE:
		case GET_USER_FAILURE:
		case USER_ORDERED_ADDRESSES_FAILURE:
		case ADD_TO_FAVORITE_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
				success: null,
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};
