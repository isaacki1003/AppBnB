import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import useModalVariableContext from './context/ModalShowVariable';
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
// import UpdateSpot from "./components/UpdateSpot";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const { showModalLogin, showModalSignUp, showModalReview } = useModalVariableContext();


  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
      <Switch>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        {/* <Route path="/spots/:spotId/update">
						<UpdateSpot />
				</Route> */}
        <Route>
          Page Not Found
        </Route>
      </Switch>
      )}
    </>
  );
}

export default App;
