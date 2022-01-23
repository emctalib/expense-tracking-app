import React, { Component, FC } from 'react'
import { NavLink } from "react-router-dom";
import { Subtract } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { LoginState } from '../slices/common';
import { Login as LoginServ } from '../services/authentication';
import { toast } from 'react-toastify';

const Login: FC = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);
    const dispatch = useDispatch();

    const onUsernameChange = (e: React.FormEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        setUsername(newValue);
    }
    const onPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        setPassword(newValue);
    }
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        LoginServ(dispatch, { username: username, password: password, submitted: true } as LoginState);
        toast.info("Welcome to system");
    }

    return (
        <>
            < form onSubmit={onFormSubmit} >
                <section className="vh-100" >
                    <div className="container py-5 h-100" >
                        <div className="row d-flex justify-content-center align-items-center h-75" >
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5" >
                                <div className="card shadow-2-strong" style={{ borderRadius: "1rem", backgroundColor: "#f8f9fa" }}>
                                    <div className="card-body p-5 text-center" >

                                        <h3 className="mb-5">Sign in to continue</h3>
                                        <Subtract className='mb-4' style={{ fontSize: "5em" }} />
                                        <div className={'input-group mb-4' + (submitted && !username ? ' has-error' : '')}>
                                            <span className="input-group-text" id="basic-addon1">Username</span>
                                            <input type="text" required className="form-control" name="username" placeholder="type username..."
                                                value={username} onChange={onUsernameChange} />
                                            {submitted && !username &&
                                                <div className="help-block">Username is required</div>
                                            }
                                        </div>

                                        <div className={'input-group mb-4' + (submitted && !password ? ' has-error' : '')}>
                                            <span className="input-group-text" id="basic-addon1">Password&nbsp;</span>
                                            <input type="password" required className="form-control" name="password" placeholder="type password..."
                                                value={password} onChange={onPasswordChange} />
                                            {submitted && !password &&
                                                <div className="help-block">Password is required</div>
                                            }
                                        </div>

                                        <div className="form-check d-flex justify-content-start mb-4">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="cbRememberMe"
                                            />
                                            <label className="form-check-label" htmlFor="cbRememberMe"> Remember password </label>
                                        </div>

                                        <button className="btn btn-primary btn-lg btn-g" type="submit">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>

                                        <hr className="my-4" />
                                        <div>
                                            <p className="mb-0">Don't have an account? <NavLink to="/register" className="btn btn-link">Register</NavLink></p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form >
        </>
    );
}

export default Login;