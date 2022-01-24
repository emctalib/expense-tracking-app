import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginInfo } from './common';

const initialState: LoginInfo = {
    token: '',
    isLoggedIn: false
}
export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        userAuthenticated: (state, action: PayloadAction<string>) => {
            sessionStorage.setItem('_authToken', action.payload);
            return {
                ...state, ...{
                    token: action.payload,
                    isLoggedIn: true,
                }
            }
        },
        logout: (state) => {
            sessionStorage.clear();
            return {
                ...state, ...{
                    token: "",
                    isLoggedIn: false,
                }
            }
        }
    }
});

export const { userAuthenticated, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;