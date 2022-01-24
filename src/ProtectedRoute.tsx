import React, { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface PropType {
    component: React.FC;
    isAuthenticated: boolean;
}

const ProtectedRoute: FC<PropType> = ({ component: Component, isAuthenticated }) => {
    console.log("isAuthenticated1:" + isAuthenticated);
    if (isAuthenticated)
        return <Component />;

    console.log("isAuthenticated2:" + isAuthenticated);
    return <Navigate to='/login' />;
};
export default ProtectedRoute;