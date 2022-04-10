import React, { ChangeEvent, useRef, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { login } from "../services/employeeService";
import AppModal from "./modal";

function LoginForm() {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [serverError, setServerError] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const passwordInput = useRef<any>();
    const emailInput = useRef<any>();

    const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    };
    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const validateInput = () => {
        const fields = [
            {
                name: "password",
                value: password,
                message: "Password is require ."
            },
            {
                name: "email",
                value: email,
                message: "Email is required .",
                messageTwo: "Email pattern is worng .",
            }
        ];

        const isNotFilled = fields.some(field => {
            const length = field.value.length;
            if (field.value.trim() === '') {
                setErrorMsg(field.message)
                field.name === "passwrod"
                    ? passwordInput.current.foucs()
                    : passwordInput.current.focus();
                field.name === "email"
                    ? emailInput.current.focus()
                    : emailInput.current.focus();
                return true
            }
            setErrorMsg('');
            return false;
        });
        return isNotFilled;
    }
    const onSubmit = async () => {
        const isInvalid = validateInput();
        if (!isInvalid) {
            setSuccessMsg("");
            const employee: {} = {
                email,
                password
            }
            const { data: token } = await login(employee)
            if (token.errorType) {
                setServerError(token.errorType)
                setShowModal(true);
                return
            }
            localStorage.setItem('token', token);
            history.push("/home");
        } else {
            setSuccessMsg('');
        }
    };

    const handleHideModal = () => {
        setShowModal(false)
    };

    return (
        <React.Fragment>
            {localStorage.getItem('token') && <Redirect to="/home" />}
            <div style={{ width: '100%', height: 50 }}>
                {showModal && <AppModal
                    onHideModal={handleHideModal}
                    label={serverError}
                    title="Server error" />}
                <div className="login-welcome" style={{ overflow: "hidden" }}>
                    <img src={require("../assets/login-welcome.jpeg")} className="login-welcome" />
                </div>
                <div className="login-form">
                    <div className="login-header">
                        <Link to="/register" className="return-login-btn">Register</Link>
                        <h3>Login</h3>
                    </div>
                    <div >
                        <div>
                            {successMsg && <p className="successMsg" style={{ color: "green" }}>{successMsg}</p>}
                            {errorMsg && <p className="errorMsg" style={{ color: "red", fontWeight: "bold" }}>{errorMsg}</p>}
                            <input
                                placeholder='Email'
                                ref={emailInput}
                                style={{ width: 350 }}
                                className="form-control m-3"
                                type="text"
                                onChange={onEmailChange}
                            />
                            <input
                                placeholder='Password'
                                ref={passwordInput}
                                style={{ width: 350 }}
                                className="form-control m-3"
                                type="text"
                                onChange={onPasswordChange}
                            />
                            <div>
                                <button className="btn btn-success login-btn" onClick={onSubmit}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}
export default LoginForm;