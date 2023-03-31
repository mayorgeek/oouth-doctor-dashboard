import React, {useEffect, useState} from 'react';

function SendMessage() {

    const [patientId, setPatientId] = useState();
    const [body, setBody] = useState();
    const handleSubmit = async (event) => {
        event.preventDefault();

        let token = localStorage.getItem("auth_token");

        await fetch("http://localhost:8080/api/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                patientId: patientId,
                body: body,
            }),
        })
            .then((response) => response.json())
            .then((body) => {
                document.getElementById("patient").value = '';
                document.getElementById("body").value = '';
            });
    };

    const [patients, setPatients] = useState([]);

    const fetchData = async () => {
        let token = localStorage.getItem("auth_token");

        await fetch("http://localhost:8080/api/v1/patients", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((body) => {
                setPatients(body.data);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">Send message to patient</h4>

                <div className="card mb-4">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="defaultSelect" className="form-label">Patient</label>
                                <select id="patient" className="form-select" onChange={event => setPatientId(event.target.value)}>
                                    {
                                        patients.map((patient) => {
                                            return <option value={patient.patientId}>{patient.patientId}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="basic-default-date">Message</label>
                                <textarea id="body" className="form-control" onChange={event => setBody(event.target.value)}></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SendMessage;