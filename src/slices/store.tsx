import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import ToastMiddleware from '../middlewares/ToastMiddleware';
import authenticationSlice from './authenticationSlice';
import expensesSlice from './expenseSlice';

const store = configureStore({
    reducer: {
        expensesSlice: expensesSlice,
        authenticationSlice: authenticationSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;