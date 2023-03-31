import React, { useState} from 'react';
import {NavLink} from "react-router-dom";

function Login() {

    const [doctorId, setDoctorId] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (event) => {
        event.preventDefault();

        await fetch("http://localhost:8080/api/v1/auth/login/doctor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                doctorId: doctorId,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((body) => {
                document.getElementById("doctorId").value = '';
                document.getElementById("password").value = '';

                localStorage.setItem("auth_token", body.token);
                return window.location.href = window.location.origin + "/home";
            });
    }

    return (
        <div>
            <div className="container-xxl">
                <div className="authentication-wrapper authentication-basic container-p-y">
                    <div className="authentication-inner">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="mb-2">Welcome to OOUTH Doctor Dashboard! 👋</h4>
                                <p className="mb-4">Please sign-in to your account and access your dashboard.</p>

                                <form id="loginForm" className="mb-3" method="POST" onSubmit={submitHandler}>
                                    <div className="mb-3">
                                        <label htmlFor="doctorId" className="form-label">Doctor ID</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="doctorId"
                                            name="doctor_id"
                                            placeholder="Enter your doctor ID"
                                            autoFocus
                                            onChange={event => setDoctorId(event.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3 form-password-toggle">
                                        <div className="d-flex justify-content-between">
                                            <label className="form-label" htmlFor="password">Password</label>
                                            <a href="">
                                                <small>Forgot Password?</small>
                                            </a>
                                        </div>
                                        <div className="input-group input-group-merge">
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control"
                                                name="password"
                                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                aria-describedby="password"
                                                onChange={event => setPassword(event.target.value)}
                                            />
                                            <span className="input-group-text cursor-pointer"><i
                                                className="bx bx-hide"></i></span>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="remember-me"/>
                                            <label className="form-check-label" htmlFor="remember-me"> Remember
                                                Me </label>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <button className="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                                    </div>
                                </form>

                                <p className="text-center">
                                    <span>New on our platform?</span>
                                    <NavLink to="/auth/register">
                                        <span>Create an account</span>
                                    </NavLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;