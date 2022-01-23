import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import { Subtract } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
//import login from '../features/userSlices';
import store from '../data/store';

export type LoginProps = {
    loggingIn: boolean;
    // logout: Function;
    // login: Function;
}

export type LoginState = {
    username: string;
    password: string;
    submitted: boolean;
}

export default class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: any) {
        super(props);
        //  this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e: React.FormEvent<HTMLInputElement>) {
        //console.log(e.target);
        const { name, value } = e.currentTarget;
        if (name == "username")
            this.setState({ username: value });
        else
            this.setState({ password: value });
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //this.setState({ submitted: true });
        //const { username, password } = this.state;
        //if (username && password) {
        //  this.props.login(username, password);
        //}
        type AppDispatch = typeof store.dispatch

        // const dispatch = useDispatch<AppDispatch>();

        //  const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

        //useAppDispatch();
        /*
        dispatch(login({
            username: this.state.username,
            password: this.state.password
        }))
        */
        //dispatch(user: {});
        //dispatch(login())
        /*)
        dispatch(login(state:
            user{
            username: this.state.username,
            password: this.state.password
        }))*/


    }


    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;

        return (
            <> {this.state.username}
                < form onSubmit={this.handleSubmit} >
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
                                                <input type="text" className="form-control" name="username" placeholder="type username..."
                                                    value={username} onChange={this.handleChange} />
                                                {submitted && !username &&
                                                    <div className="help-block">Username is required</div>
                                                }
                                            </div>

                                            <div className={'input-group mb-4' + (submitted && !password ? ' has-error' : '')}>
                                                <span className="input-group-text" id="basic-addon1">Password&nbsp;</span>
                                                <input type="password" className="form-control" name="password" placeholder="type password..."
                                                    value={password} onChange={this.handleChange} />
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
}

