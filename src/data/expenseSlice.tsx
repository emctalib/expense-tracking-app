import { createSlice, createAction, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { ExpenseDetail, ExpenseBase } from './common';

export const setExpenseError = createAction("setExpenseError");
export const newExpenseError = createAction("newExpenseError");
export const editExpenseError = createAction("editExpenseError");
export const deleteExpenseError = createAction("deleteExpenseError");

interface InsertAction {
    type: "NewExpense",
    payload: ExpenseDetail
}

type Action = InsertAction;

export const expensesSlice = createSlice({
    name: 'expense store',
    initialState: {
        expenses: [] as ExpenseDetail[],
    },
    reducers: {
        newExpense1: (state, action) => {
            return { ...state, expenses: [...action.payload] }
        },

        newExpense: {
            reducer: (state, action: PayloadAction<ExpenseDetail>) => {
                var maxRow = Math.max(...state.expenses.map(b => b.row)) + 1;
                action.payload.row = maxRow;
                state.expenses.push(action.payload);
            },
            prepare: (expense: ExpenseBase) => {
                var g1 = expensesSlice.actions;
                return {
                    payload: {
                        id: nanoid(),
                        row: 0,
                        description: expense.description,
                        amount: expense.amount,
                        createdAt: expense.createdAt,
                    } as ExpenseDetail
                }
            },
        },
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
        },
        editExpense1: {
            reducer: (state, action: PayloadAction<ExpenseDetail>) => {
                state.expenses.push(action.payload);
            },
            prepare: (expense: ExpenseBase) => {
                return {
                    payload: {
                        id: nanoid(),
                        row: 0,
                        description: expense.description,
                        amount: expense.amount,
                        createdAt: expense.createdAt,
                    } as ExpenseDetail
                }
            },
        },
    }
});

export const { newExpense, setExpense, deleteExpense, editExpense } = expensesSlice.actions;
export default expensesSlice.reducer;

