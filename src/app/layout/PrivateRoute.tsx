// Components
import UnauthModal from "../../features/auth/UnauthModal";

// library
import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { RootState } from "../store/configureStore";

interface IPrivateRouteProps {
  [x: string]: any;
  component: any;
  prevLocation?: any;
}

const PrivateRoute: React.VFC<IPrivateRouteProps> = ({
  component: Component,
  prevLocation,
  ...rest
}) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Component {...props} /> : <UnauthModal {...props} />
      }
    />
  );
};

export default PrivateRoute;
