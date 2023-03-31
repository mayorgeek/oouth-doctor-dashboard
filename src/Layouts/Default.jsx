import React, {useEffect} from 'react';
import SideBar from "../Components/SideBar";
import NavBar from "../Components/NavBar";
import {Outlet} from "react-router-dom";

function Default() {

    const authMiddleware = () => {
        if (!localStorage.getItem("auth_token")) {
            return window.location.href = window.location.origin + "/auth/login";
        }
    };

    useEffect(() => {
        authMiddleware();
    }, []);

    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    {/* Sidebar */}
                    <SideBar />

                    {/* Layout Container */}
                    <div className="layout-page">
                        {/* Navbar */}
                        <NavBar />

                        {/* Content Wrapper */}
                        <div className="content-wrapper">
                            {/* Content */}
                            <div>
                                <Outlet />
                            </div>
                            {/* End Content */}
                            <div className="content-backdrop fade"></div>
                        </div>
                    </div>
                </div>

                {/* Overlay */}
                <div className="layout-overlay layout-menu-toggle"></div>
            </div>
        </>
    );
}

export default Default;