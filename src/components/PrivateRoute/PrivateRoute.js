import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { loggedUser } from "../Home/Home";


const PrivateRoute = ({ children, ...rest }) => {
    const [user, setUser] = useContext(loggedUser);
    return (
      <Route
        {...rest}
        render={({ location }) =>
            user.email ? (
                children
            ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute;