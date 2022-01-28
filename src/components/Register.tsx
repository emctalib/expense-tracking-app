import React, { Component, FC } from 'react'
import { NavLink, Navigate } from "react-router-dom";
import { Subtract } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { LoginState } from '../slices/common';
import { Login as LoginServ } from '../services/authentication';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const fullNameElement = useRef<HTMLInputElement>(null);

    useEffect(() => { fullNameElement.current?.focus() }, [])
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => { }
    return (
        <>
            < form onSubmit={onFormSubmit} >
                <section className="vh-100" >
                    <div className="container py-5 h-100" >
                        <div className="row d-flex justify-content-center align-items-center h-75" >
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5" >
                                <div className="card shadow-2-strong" style={{ borderRadius: "1rem", backgroundColor: "#f8f9fa" }}>
                                    <div className="card-body p-5 text-center" >

                                        <h3 className="mb-5">User Registration</h3>
                                        <Subtract className='mb-4' style={{ fontSize: "5em" }} />
                                        <div className={'input-group mb-4' + (isSubmiting && !password ? ' has-error' : '')}>
                                            <span className="input-group-text" id="basic-addon1">Full Name&nbsp;</span>
                                            <input type="text" required className="form-control" name="fullName" ref={fullNameElement} placeholder="type full name..." />
                                        </div>

                                        <div className={'input-group mb-4' + (isSubmiting && !username ? ' has-error' : '')}>
                                            <span className="input-group-text" id="basic-addon1">Username</span>
                                            <input type="text" required className="form-control" name="username" placeholder="type username..." />
                                        </div>

                                        <div className={'input-group mb-4' + (isSubmiting && !password ? ' has-error' : '')}>
                                            <span className="input-group-text" id="basic-addon1">Password&nbsp;</span>
                                            <input type="password" required className="form-control" name="password" placeholder="type password..." />
                                        </div>

                                        <div className={'input-group mb-4' + (isSubmiting && !password ? ' has-error' : '')}>
                                            <span className="input-group-text" id="basic-addon1">Confirm Password&nbsp;</span>
                                            <input type="password" required className="form-control" name="password" placeholder="type password..." />
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
                                            <p className="mb-0">Already have an account? <NavLink to="/login" className="btn btn-link">Login</NavLink></p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form >
        </>
    )
}
