import { userAuthenticated, logout } from "../slices/authenticationSlice";
import { LoginState, LoginInfo } from "../slices/common";

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


export const LoginUser = async (credentials: LoginState) => {
    let token = { fullName: "", username: credentials.username, isLoggedIn: false, token: "" } as LoginInfo;
    try {
        if (credentials.username == "admin" && credentials.password == "admin") {
            token.isLoggedIn = true;
            token.token = "__" + credentials.username
            sessionStorage.setItem("_userAuthentication", JSON.stringify(token));
            return token;
        }
    }
    catch {
        console.log("Error: unable to login user");
    }
    return token;
}



export const CheckAlreadyLogin = () => {
    try {
        let json = sessionStorage.getItem("_userAuthentication");
        if (json !== undefined && json !== null) {
            return JSON.parse(json) as LoginInfo;
        }
    }
    catch {
        console.log("Error: unable to login user");
    }
    return null;
}