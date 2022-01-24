import React, { FC, useEffect } from "react";
import { Route, Navigate, useLocation, RouteProps } from "react-router-dom";

interface PropType {
    component: React.FC;
    isAuthenticated: boolean;
}

const ProtectedRoute: FC<PropType> = ({ component: Component, isAuthenticated }) => {
    if (isAuthenticated) return <Component />;
    return <Navigate to='/login' />;
};
export default ProtectedRoute;