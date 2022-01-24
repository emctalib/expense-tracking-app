import React, { Component, FC } from 'react'
import { NavLink, Navigate } from "react-router-dom";
import { Subtract } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { LoginState } from '../slices/common';
import { Login as LoginServ } from '../services/authentication';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const Login: FC = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState<string>("admin");
    const [password, setPassword] = useState<string>("admin");
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
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
        setIsSubmiting(true);
        LoginServ(dispatch, { username: username, password: password, submitted: isSubmiting } as LoginState).then((result) => {
            if (result) {
                setIsSubmiting(false);
                toast.info("Welcome to system");
                navigate("/");
            }
            else {
                setIsSubmiting(false);
                toast.info("Unable to login. Either username or password is invalid.");
            }
        });
        e.preventDefault();
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
                                        <div className={'input-group mb-4' + (isSubmiting && !username ? ' has-error' : '')}>
                                            <span className="input-group-text" id="basic-addon1">Username</span>
                                            <input type="text" required className="form-control" name="username" placeholder="type username..."
                                                value={username} onChange={onUsernameChange} />
                                            {isSubmiting && !username &&
                                                <div className="help-block">Username is required</div>
                                            }
                                        </div>

                                        <div className={'input-group mb-4' + (isSubmiting && !password ? ' has-error' : '')}>
                                            <span className="input-group-text" id="basic-addon1">Password&nbsp;</span>
                                            <input type="password" required className="form-control" name="password" placeholder="type password..."
                                                value={password} onChange={onPasswordChange} />
                                            {isSubmiting && !password &&
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

                                        <input className="btn btn-primary btn-lg btn-g" type="submit" disabled={isSubmiting} value={isSubmiting ? "logining...." : "Login"} />
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