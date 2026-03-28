import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme.js";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./StateMangement/Authentication/Action.js";
import { findCart } from "./StateMangement/Cart/Action.js";
import Routers from "./Routers/Routers.jsx";
import { getRestaurantByUserId } from "./StateMangement/Restaurant/Action.js";

function App() {
	const dispatch = useDispatch();
	const jwt = localStorage.getItem("jwt");
	const auth = useSelector((store) => store.auth);
	useEffect(() => {
		dispatch(getUser(auth.token || jwt));
		dispatch(findCart(jwt));
	}, [auth.token, jwt]);

	useEffect(() => {
		dispatch(getRestaurantByUserId(auth.jwt || jwt));
	}, [auth.user]);

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Routers />
		</ThemeProvider>
	);
}
export default App;
