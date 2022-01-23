import React from 'react'
import ExpenseForm from './ExpenseForm'
import { ExpenseRowList } from './ExpenseRowList'

export const Expenses = () => {
    return (
        <>
            <div className='container'>
                <div className='pt-3 jumbotron'>
                    <h2>Expense Tracking</h2>
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
                            <ExpenseRowList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
