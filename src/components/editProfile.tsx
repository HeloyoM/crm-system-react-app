import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { getEmployee } from '../services/employeeService';
import { update } from "../services/employeeService";


function EditProfile() {
    const match: any = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        getEmployeeDetails();
    }, []);

    async function getEmployeeDetails() {
        const firstname = match.params.firstname;
        const { data: employee } = await getEmployee(firstname);
        if (!employee.length) {
            history.replace("/not-found")
        } else {
            setTimeout(() => {
                toMapViewModel(employee);
            }, 800)
        }
    }
    function toMapViewModel(employee: any) {
        setEmployeeId(employee[0].employeeId)
        setFirstName(employee[0].firstName);
        setLastName(employee[0].lastName);
        setEmail(employee[0].email);
    }

    const [employeeId, setEmployeeId] = useState(0);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hide, setHide] = useState('string');

    const onFirstnameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value)
    }
    const onLastnameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value)
    }
    const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const disabledPassword = () => {
        if (hide === "") {
            setHide("password")
        } else {
            setHide("")
        }
    }
    const handleSubmit = async () => {
        const employee = {
            employeeId,
            firstName,
            lastName,
            email,
            password
        }
        const { data: token } = await update(employee);
        localStorage.setItem('token', token)
        history.push("/home")
    }
    let classes = "fa fa-eye"
    if (hide === "password") {
        classes += "-slash";
    };
    const userPlaceholder = require('../assets/user-placeholder.png');
    const arrowLeft = require("../assets/arrow-left.png");
    return (
        <div className="container-middle">
            <div className="profile-dashborad">
                <div className='profile-header'>
                    <Link to={`/home`}>
                        <img
                            src={arrowLeft}
                            width={25}
                            className="arrow" />
                    </Link>
                    <h6>Edit profile</h6>
                </div>
                <hr />
                <div>
                    <img
                        src={require("../assets/pen.png")}
                        width={25}
                        className="pen" /><img
                        src={userPlaceholder}
                        className="photoPlaceholder" />
                </div>
                <div className="owner">
                    <p>{firstName}</p>
                    <p style={{ fontSize: 15, fontWeight: "noraml" }}>{email}</p>
                </div>
                <div className="p-3">
                    <div>
                        <input
                            onChange={onFirstnameChange}
                            placeholder='First name'
                            type="text"
                            className="form-control m-3 p-2"
                            style={{ width: 270 }}
                            value={firstName} />
                        <input
                            onChange={onLastnameChange}
                            placeholder='Last name'
                            type="text"
                            className="form-control m-3"
                            style={{ width: 270 }}
                            value={lastName} />
                        <input
                            onChange={onEmailChange}
                            placeholder='Email'
                            type="text"
                            className="form-control m-3"
                            style={{ width: 270 }}
                            value={email} />

                        <i className={classes} aria-hidden="true" onClick={disabledPassword}></i><input
                            onChange={onPasswordChange}
                            placeholder='Password'
                            type={hide}
                            className="form-control m-3"
                            style={{ width: 270 }} />
                    </div>
                    <div>
                        <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditProfile;
