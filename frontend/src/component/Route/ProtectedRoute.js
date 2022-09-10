import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);

  if (loading === false && isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  if (loading === false && isAdmin === true && user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return (
    <Fragment>
      {loading === false ? (
       <Component {...rest} />
      ) : null}
    </Fragment>
    // <Fragment>
    //   {loading === false && (
    //     <Route
    //       {...rest}
    //       render={(props) => {
    //         if (!isAuthenticated === false) {
    //           return <Navigate to="/login" />;
    //         }
    //         if (isAdmin === true && user.role !== "admin") {
    //           return <Navigate to="/login" />;
    //         }

    //         return <Component {...props} />;
    //       }}
    //     />
    //   )}
    // </Fragment>
  );
};

export default ProtectedRoute;
