import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import SingleSpot from "./components/SingleSpot";
import AddSpot1 from "./components/AddSpot1";
import UpdateSpot from "./components/UpdateSpot";
import ScrollToTop from "./components/ScrollToTop";
import User from "./components/User";
import PortfolioButton from "./components/PortfolioButton";
import NotFound from "./components/NotFound";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
		isLoaded && (
			<div>
				<Navigation isLoaded={isLoaded} />
				<ScrollToTop />
				<PortfolioButton />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/user">
						<User />
					</Route>
					<Route exact path="/spots/:spotId">
						<SingleSpot />
					</Route>
					<Route exact path="/spots/:spotId/update">
						<UpdateSpot />
					</Route>
					<Route exact path="/become-a-host">
						<AddSpot1 />
					</Route>
					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
			</div>
		)
	);
}

export default App;
