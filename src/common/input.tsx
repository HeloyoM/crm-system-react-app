import React from 'react';

export interface IInput {
    name: string,
    label?: string,
    error: string,
    className?: string,
    placeholder?: string,
    onChange?: any,
    ref?: any
}

function Input(props: IInput) {
    return (
        <div className="form-group">
            <label htmlFor={props.name}>{props.label}</label>
            <input
                onChange={props.onChange}
                placeholder={props.placeholder}
                name={props.name}
                id={props.name}
                className={props.className ? props.className : "form-control"}
                ref={props.ref}
            />
            {props.error &&
                <div className="alert alert-danger">
                    {props.error}
                </div>}
        </div>
    )
}
export default Input