import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";

function Auth() {

    const guestMiddleware = () => {
        if (localStorage.getItem("auth_token")) {
            return window.location.href = window.location.origin + "/home";
        }
    };

    useEffect(() => {
        guestMiddleware();
    }, []);

    return (
        <div>
            <div className="container col-lg-6 mx-auto mt-5">
                <Outlet />
            </div>
        </div>
    );
}

export default Auth;