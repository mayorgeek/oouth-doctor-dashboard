import React, {useEffect, useState} from 'react';

function Appointments() {

    const [appointments, setAppointments] = useState([]);
    const fetchData = async () => {
        let token = localStorage.getItem("auth_token");

        await fetch("http://localhost:8080/api/v1/appointments/patient", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((body) => {
                setAppointments(body.data);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">Appointments</h4>

                <div className="card">
                    <div className="table-responsive text-nowrap">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Doctor</th>
                                <th>Prescription</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                            {
                                appointments.map((appointment) => {
                                    return <tr>
                                        <td>
                                            <i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>{appointment.id}</strong>
                                        </td>
                                        <td>{appointment.doctorName}</td>
                                        <td className="text-truncate">
                                            {appointment.prescription}
                                        </td>
                                        <td>
                                            {new Date(appointment.createdAt).toLocaleDateString()}
                                        </td>
                                        <td>
                                            {new Date(appointment.createdAt).toLocaleTimeString()}
                                        </td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appointments;