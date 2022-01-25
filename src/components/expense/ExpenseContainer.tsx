import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetExpenses, DeleteExpense } from '../../services/expenses';
import { RootState } from '../../slices/store';
import ExpenseForm from './ExpenseForm';
import { ExpenseRowList } from './ExpenseRowList';
import { ExpenseTotal } from './ExpenseTotal'

export const ExpenseContainer = () => {
    const dispatch = useDispatch();
    const expenses = useSelector((state: RootState) => state.expensesSlice.expenses);

    useEffect(() => {
        console.log("rendering ExpenseRowList.");
        GetExpenses(dispatch);
    }, []); //[] param to control when component will rerender. it will not render as its blank array.

    return (
        <>
            <div className='container'>
                <div className='pt-3 jumbotron'>
                    <div className='row'>
                        <div className='col-sm-8'><h2>Expense Tracking</h2></div>
                        <div className='col-sm-4'><div className='text-end'>
                            <ExpenseTotal expenses={expenses} ></ExpenseTotal>
                        </div></div>
                    </div>

                    <hr style={{ border: '1px solid grey' }} />
                    <div>
                        <div className="row tableBorder">
                            <div className="col-sm-2 bg-dark text-light"><h5>#</h5></div>
                            <div className="col-sm-2 bg-dark text-light"><h5>Date</h5></div>
                            <div className="col-sm-3 bg-dark text-light"><h5>Description</h5></div>
                            <div className="col-sm-3 bg-dark text-light"><h5>Amount</h5></div>
                            <div className="col-sm-2 bg-dark text-light"><h5>Action</h5></div>
                        </div>
                        <hr style={{ border: '1px solid grey' }} />
                        <ExpenseForm />
                        <hr style={{ border: '1px solid grey' }} />
                        <div className='scrollDiv'>
                            <ExpenseRowList expenses={expenses} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
