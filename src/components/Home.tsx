import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import ExpenseForm from './ExpenseForm'
import { ExpenseList } from './ExpenseList'
import 'react-toastify/dist/ReactToastify.css'

export const Home = () => {
    return (
        <>
            <div style={{ width: '70%', margin: 'auto' }}>
                <h1><u>Expense Tracking</u></h1>

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
                    <ExpenseForm title='stest' />
                    <hr style={{ border: '1px solid grey' }} />
                    <div className='scrollDiv'>
                        <ExpenseList />
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <ToastContainer />
        </>
    )
}
