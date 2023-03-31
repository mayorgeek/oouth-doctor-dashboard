import React, {useEffect, useState} from 'react';

function PrescribeDrug() {

    const [prescription, setPrescription] = useState();
    const [appointmentId, setAppointmentId] = useState();
    const handleSubmit = async (event) => {
        event.preventDefault();

        let token = localStorage.getItem("auth_token");

        await fetch("http://localhost:8080/api/v1/appointments/add-prescription", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                appointment: appointmentId,
                drug: prescription
            }),
        })
            .then((response) => response.json())
            .then((body) => {
                document.getElementById("appointment").value = '';
                document.getElementById("prescription").value = '';
            });
    };

    const [appointments, setAppointments] = useState([]);
    const fetchAppointments = async () => {
        let token = localStorage.getItem("auth_token");

        await fetch("http://localhost:8080/api/v1/appointments", {
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

    const [drugs, setDrugs] = useState();
    const fetchDrugs = async () => {
        let token = localStorage.getItem("auth_token");

        await fetch("http://localhost:8080/api/v1/appointments", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((body) => {
                setDrugs(body.data);
            });
    };

    useEffect(() => {
        fetchAppointments();
        fetchDrugs();
    }, []);

    return (
        <div>
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">Prescribe a Drug</h4>

                <div className="card mb-4">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="defaultSelect" className="form-label">Patient</label>
                                <select id="appointment" className="form-select" onChange={event => setAppointmentId(event.target.value)}>
                                    {
                                        appointments.map((appointment) => {
                                            return <option value={appointment.patientId}>{appointment.patientId}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="basic-default-date">Prescription</label>
                                <select id="prescription" className="form-select" onChange={event => setPrescription(event.target.value)}>
                                    {
                                        drugs.map((drug) => {
                                            return <option value={drug.reference}>{drug.name}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrescribeDrug;