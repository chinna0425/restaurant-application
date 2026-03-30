import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme.js";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./StateMangement/Authentication/Action.js";
import { findCart } from "./StateMangement/Cart/Action.js";
import Routers from "./Routers/Routers.jsx";
import { getRestaurantByUserId } from "./StateMangement/Restaurant/Action.js";
import Cookies from "js-cookie";
function App() {
	const dispatch = useDispatch();
	const jwt = Cookies.get("jwt");
	const auth = useSelector((store) => store.auth);
	useEffect(() => {
		if (auth.token || jwt) {
			dispatch(getUser(auth.token || jwt));
			dispatch(findCart(jwt));
		}
	}, [auth.token, jwt]);

	useEffect(() => {
		if (auth.user?.role === "ROLE_RESTAURANT_OWNER" && (auth.jwt || jwt)) {
			dispatch(getRestaurantByUserId(auth.jwt || jwt));
		}
	}, [auth.user]);

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Routers />
		</ThemeProvider>
	);
}
export default App;
