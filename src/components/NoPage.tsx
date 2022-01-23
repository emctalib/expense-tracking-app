import React from 'react'
import { Outlet, NavLink } from "react-router-dom";

export const NoPage = () => {
    return (
        <>
            <div className='container pt-4'>
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-3">oooooops!!!!</h1>
                        <h3>There was a problem serving the requested page.</h3>
                        <p>An unexpected error may have occurred while processing your request. Try refreshing the page, or going back and trying to complete the request again. The problem may only be temporary.
                            If the problem persists and you need help immediately, contact us.</p>
                        <NavLink to="/" className="btn btn-primary btn-lg">Back</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}