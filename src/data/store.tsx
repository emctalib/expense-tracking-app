import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import ToastMiddleware from '../middlewares/ToastMiddleware';
import expensesSlice from './expenseSlice';

const store = configureStore({
    reducer: {
        expensesSlice: expensesSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export default store;