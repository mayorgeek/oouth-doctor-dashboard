import React, {useEffect, useState} from 'react';

function Profile() {

    const [user, setUser] = useState({});

    let fetchData = async () => {
        let token = localStorage.getItem("auth_token");

        await fetch("http://localhost:8080/api/v1/profile/patient", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((body) => {
                setUser(body.data);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4">
                            <h5 className="card-header">Profile Details</h5>
                            <div className="card-body">
                                <div className="d-flex align-items-start align-items-sm-center gap-4">
                                    <img
                                        src="/assets/img/avatars/user.png"
                                        alt="user-avatar"
                                        className="d-block rounded"
                                        height="100"
                                        width="100"
                                        id="uploadedAvatar"
                                    />
                                    <div className="button-wrapper">
                                        <label htmlFor="upload" className="btn btn-primary me-2 mb-4" tabIndex="0">
                                            <span className="d-none d-sm-block">Upload new photo</span>
                                            <i className="bx bx-upload d-block d-sm-none"></i>
                                            <input
                                                type="file"
                                                id="upload"
                                                className="account-file-input"
                                                hidden
                                                accept="image/png, image/jpeg"
                                            />
                                        </label>
                                        <button type="button"
                                                className="btn btn-outline-secondary account-image-reset mb-4">
                                            <i className="bx bx-reset d-block d-sm-none"></i>
                                            <span className="d-none d-sm-block">Reset</span>
                                        </button>

                                        <p className="text-muted mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-0"/>
                            <div className="card-body">
                                <form id="formAccountSettings" method="POST" onSubmit={event => event.preventDefault()}>
                                    <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={user.name}
                                                autoFocus
                                            />
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="patient_id" className="form-label">Patient ID</label>
                                            <input readOnly className="form-control" type="text" name="patient_id" id="patient_id"
                                                   value={user.patientId} />
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <button type="submit" className="btn btn-primary me-2">Save changes</button>
                                        <button type="reset" className="btn btn-outline-secondary">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="card">
                            <h5 className="card-header">Delete Account</h5>
                            <div className="card-body">
                                <div className="mb-3 col-12 mb-0">
                                    <div className="alert alert-warning">
                                        <h6 className="alert-heading fw-bold mb-1">Are you sure you want to delete your
                                            account?</h6>
                                        <p className="mb-0">Once you delete your account, there is no going back. Please
                                            be certain.</p>
                                    </div>
                                </div>
                                <form id="formAccountDeactivation" onSubmit="return false">
                                    <div className="form-check mb-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="accountActivation"
                                            id="accountActivation"
                                        />
                                        <label className="form-check-label" htmlFor="accountActivation"
                                        >I confirm my account deactivation</label
                                        >
                                    </div>
                                    <button type="submit" className="btn btn-danger deactivate-account">Deactivate
                                        Account
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;