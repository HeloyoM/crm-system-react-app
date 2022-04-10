import React, { ChangeEvent, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import Input from '../common/input';
import { register } from "../services/employeeService";
import AppModal from "./modal";
import SocialMediaLogin from './SocialMediaLogin';

export interface IRegister {
    history: any
}
function RegisterForm(props: IRegister) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [serverError, setServerError] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const firstNameInput = useRef<any>();
    const lastNameInput = useRef<any>();
    const emailInput = useRef<any>();
    const passwordInput = useRef<any>();

    const onFirstnameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    }
    const onLastnameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }
    const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const validateInput = () => {
        const fields = [
            {
                name: "firstName",
                value: firstName,
                message: "First name is required ."
            },
            {
                name: "lastName",
                value: lastName,
                message: "Last name is required ."
            },
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
                field.name === "firstName"
                    ? passwordInput.current.foucs()
                    : passwordInput.current.focus();
                field.name === "lastName"
                    ? emailInput.current.focus()
                    : emailInput.current.focus();
                field.name === "email"
                    ? emailInput.current.focus()
                    : emailInput.current.focus();
                field.name === "password"
                    ? emailInput.current.focus()
                    : emailInput.current.focus();
                return true
            }
            setErrorMsg('');
            return false;
        });
        return isNotFilled;
    }
    const handleSubmit = async () => {
        const isInvalid = validateInput();
        if (!isInvalid) {
            const employee = {
                firstName,
                lastName,
                email,
                password
            }
            const { data: token } = await register(employee);
            if (token.errorType) {
                setServerError(token.errorType)
                setShowModal(true);
                return
            }
            localStorage.setItem('token', token);
            props.history.push("/home");
        }
    }
    const handleHideModal = () => {
        setShowModal(false)
    };
    return (
        <>
            {showModal && <AppModal
                onHideModal={handleHideModal}
                label={serverError}
                title="Server error" />}
            <div className="navTop"></div>
            <div className="register-form">
                <div className="register-header">
                    <Link to="/home" style={{ float: "left" }}><img src={require("../assets/return.png")} width={30} /></Link>
                    <h3>Register</h3>
                    <p>Fill out the registration form for a new employee</p>
                </div>
                <div className="form-group">
                    {errorMsg && <p className="errorMsg" style={{ color: "red", fontWeight: "bold" }}>{errorMsg}</p>}
                    <input type='text'
                        name='firstName'
                        placeholder={'First name'}
                        ref={firstNameInput}
                        className='register-input m-3'
                        onChange={onFirstnameChange} />
                    <input type='text'
                        name='lastName'
                        ref={lastNameInput}
                        placeholder='Last name'
                        className="register-input m-3"
                        onChange={onLastnameChange} />
                    <input type='text'
                        name='email'
                        placeholder='Email'
                        ref={emailInput}
                        className="register-input m-3"
                        onChange={onEmailChange} />
                    <input type='text'
                        name='password'
                        placeholder='Password'
                        ref={passwordInput}
                        className="register-input m-3"
                        onChange={onPasswordChange} />
                    <div className="m-3">
                        <button className="btn btn-success" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
                <div>
                    Already registered? <Link to="/login">login</Link>
                </div>
                <hr />
                <SocialMediaLogin token={localStorage.getItem('token')} />
            </div>
        </>
    )
}

export default RegisterForm
