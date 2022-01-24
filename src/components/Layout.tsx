import React, { FC } from 'react'
import { Outlet, NavLink } from "react-router-dom";

import { Subtract, CardList, House } from 'react-bootstrap-icons';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

interface LayoutProps {
    isLoggedIn: boolean;
}

export const Layout: FC<LayoutProps> = ({ isLoggedIn }) => {
    return (
        <>
            {isLoggedIn ?
                <>
                    <nav className="navbar navbar-dark bg-dark">
                        <NavLink to="/" className="navbar-brand">
                            <Subtract className='fs-3' />&nbsp;Expense Tracking System</NavLink>
                        <div>
                            <a className="navbar-brand">john@example.com</a>
                            <NavLink to="/logoff" className="navbar-brand">Logoff</NavLink>
                        </div>
                    </nav>
                    <div className="row">
                        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                            <div className="sidebar-sticky">
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <NavLink to="/" className="nav-link"><House></House>&nbsp;Home</NavLink>
                                    </li>
                                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                        <span>Expenses</span>
                                    </h6>
                                    <li className="nav-item">
                                        <NavLink to="/expense" className="nav-link"><CardList></CardList>&nbsp;Tracking</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/expense" className="nav-link"><CardList></CardList>&nbsp;Types</NavLink>
                                    </li>
                                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                        <span>Manage Todos</span>
                                    </h6>
                                    <li className="nav-item">
                                        <NavLink to="/todo" className="nav-link"><CardList></CardList>&nbsp;Todo</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                            <Outlet />
                        </main>
                    </div>
                </>
                :
                <>
                    <nav className="navbar navbar-dark bg-dark">
                        <NavLink to="/" className="navbar-brand">
                            <Subtract className='fs-3' />&nbsp;Expense Tracking System</NavLink>
                        <div>
                            <NavLink to="/register" className="navbar-brand">Register</NavLink>
                            <NavLink to="/login" className="navbar-brand">Login</NavLink>
                        </div>
                    </nav>
                    <Outlet />
                </>
            }
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
};