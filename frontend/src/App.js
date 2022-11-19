import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import SingleSpot from "./components/SingleSpot";
import AddSpot1 from "./components/AddSpot1";
import UpdateSpot from "./components/UpdateSpot";


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
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/spots/:spotId">
						<SingleSpot />
					</Route>
					<Route path="/spots/:spotId/update">
						<UpdateSpot />
					</Route>
					<Route path="/become-a-host">
						<AddSpot1 />
					</Route>
				</Switch>
			</div>
		)
	);
}

export default App;
