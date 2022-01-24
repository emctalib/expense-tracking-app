import { userAuthenticated, logout } from "../slices/authenticationSlice";
import { LoginState } from "../slices/common";


export const Login = async (dispatch: any, credentials: LoginState) => {
    try {
        if (credentials.username == "admin" && credentials.password == "admin") {
            dispatch(userAuthenticated("1234343242"));
            return true;
        }
    }
    catch {
        console.log("Error: unable to login user");
    }
    return false;
}

export const AlreadyLogin = async (dispatch: any) => {
    try {
        const token = sessionStorage.getItem("_authToken");
        if (token !== undefined && token != null && token != "") {
            // Page is refreshed so, we need to pull token and add to store.
            dispatch(userAuthenticated(token));
        }

    }
    catch {
        console.log("Error: unable to check already login");
    }
}


export const LogOff = async (dispatch: any) => {
    try {
        const token = sessionStorage.getItem("_authToken");
        if (token !== undefined && token != null) {
            dispatch(logout());
        }
        else {
            throw "User is not logined.";
        }

    }
    catch {
        console.log("Error: unable to logoff user");
    }
}
