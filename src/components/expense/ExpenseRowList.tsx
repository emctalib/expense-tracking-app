import React, { FC, useEffect, useState } from 'react'
import { ExpenseDetail } from '../../slices/common';
import { useDispatch, useSelector } from 'react-redux';
import { GetExpenses, DeleteExpense } from '../../services/expenses';
import { RootState } from '../../slices/store';
import { XLg, Pencil } from 'react-bootstrap-icons';
import ExpenseForm from './ExpenseForm';
import { ExpenseRowItem } from './ExpenseRowItem';

export const ExpenseRowList: FC = () => {
    const dispatch = useDispatch();
    const expenses = useSelector((state: RootState) => state.expensesSlice.expenses);

    useEffect(() => {
        console.log("rendering ExpenseRowList.");
        GetExpenses(dispatch);
    }, []); //[] param to control when component will rerender. it will not render as its blank array.

    return <>
        {
            expenses.map(e =>
                <>
                    <div key={e.id} style={{ marginBottom: '1rem' }}>
                        <ExpenseRowItem expense={e} />
                    </div>
                </>
            )
        }
    </>
} 