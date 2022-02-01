import React, { FC, Profiler, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetExpenses, DeleteExpense } from '../../services/expenses';
import { RootState } from '../../slices/store';
import ExpenseForm from './ExpenseForm';
import { ExpenseGraph } from './ExpenseGraph';
import { ExpenseRowList } from './ExpenseRowList';
import { ExpenseTotal } from './ExpenseTotal'
import { GraphDown } from 'react-bootstrap-icons';

export const ExpenseContainer = () => {
    const dispatch = useDispatch();
    const expenses = useSelector((state: RootState) => state.expensesSlice.expenses);

    useEffect(() => {
        console.log("rendering ExpenseRowList.");
        GetExpenses(dispatch);
    }, []); //[] param to control when component will rerender. it will not render as its blank array.

    const onRenderCallback = (
        id: any, // the "id" prop of the Profiler tree that has just committed
        phase: any, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
        actualDuration: any, // time spent rendering the committed update
        baseDuration: any, // estimated time to render the entire subtree without memoization
        startTime: any, // when React began rendering this update
        commitTime: any, // when React committed this update
        interactions: any// the Set of interactions belonging to this update
    ) => {
        //  console.log("Profiling:", id, phase, actualDuration, startTime, commitTime, interactions);
        console.log(`Profiling: ${id}'s ${phase} phase:`);
        console.log(`Profiling: Actual time: ${actualDuration}`);
        console.log(`Profiling: Base time: ${baseDuration}`);
        console.log(`Profiling: Start time: ${startTime}`);
        console.log(`Profiling: Commit time: ${commitTime}`);
    }

    return (
        <>
            <Profiler id="expense" onRender={onRenderCallback}></Profiler>
            <div className='container'>
                <div className='pt-3 jumbotron'>
                    <div className='row'>
                        <div className='col-sm-8'><h2>Expense Tracking</h2></div>
                        <div className='col-sm-4'><div className='text-end'>
                            <ExpenseTotal expenses={expenses} ></ExpenseTotal>&nbsp;

                        </div>
                        </div>

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
                    <ExpenseGraph expenses={expenses}></ExpenseGraph>
                </div>

            </div>

        </>
    )
}
