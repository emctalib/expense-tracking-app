import { createSlice, createAction } from '@reduxjs/toolkit';
import { ExpenseDetail } from './common';

export const setExpenseError = createAction("setExpenseError");
export const newExpenseError = createAction("newExpenseError");
export const editExpenseError = createAction("editExpenseError");
export const deleteExpenseError = createAction("deleteExpenseError");

export const expensesSlice = createSlice({
    name: 'expense store',
    initialState: {
        expenses: [] as ExpenseDetail[],
    },
    reducers: {
        newExpense: (state, action) => {
            return { ...state, expenses: [...action.payload] }
        },
        /*
        newExpense: {
            reducer(state, action) {
                return { ...state, expenses: [...action.payload] }
            },
            prepare(title: string, ex: Expense) {
                return {
                    payload: ex,
                }
            },
        },*/
        setExpense: (state, action) => {
            return { ...state, expenses: [...action.payload] };
        },
        deleteExpense: (state, action) => {
            const expenses = state.expenses.filter(expense =>
                expense.id !== action.payload.id);
            return { ...state, expenses: [...expenses] };
        },
        editExpense: (state, action) => {
            const expenses = state.expenses.map(expense => {
                if (expense.id === action.payload.id) {
                    expense = action.payload; // change the item with payload.
                }
                return expense;
            });
            return { ...state, expenses: [...expenses] };
        }
    }
});

export const { newExpense, setExpense, deleteExpense, editExpense } = expensesSlice.actions;
export default expensesSlice.reducer;

