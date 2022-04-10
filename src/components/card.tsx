import React, { Component, useState } from 'react';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'


export interface ICard {
    onDelete(id: number): void,
    firstName: string,
    lastName: string,
    email: string,
    employeeId: number,
    admin: boolean
};

function EmployeeCard(props: ICard) {
    const userPlaceholder = require('../assets/user-placeholder.png');
    const { employeeId } = props;
    const { admin, firstName, lastName } = props
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-5">
                    <Card className="employee-card">
                        <div>
                            <img
                                src={userPlaceholder}
                                className="employee-image" />
                        </div>
                        <Card.Body>
                            <div className="employee-header">
                                <div >
                                    {admin && <Link to={`/profile/${firstName}/edit`}>
                                        <h3>{firstName} {lastName}</h3>
                                    </Link>}
                                    {!admin && <h3>{firstName} {lastName}</h3>}
                                </div>
                                {!admin && <hr style={{ backgroundColor: "#6e6969", width: 570, height: 3 }} />}
                            </div>
                            <Card.Text className="employee-details">
                                Email:<a> {props.email}</a>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                {admin && <span className="col">
                    <button className="btn btn-danger m-3 delete-btn" onClick={() => props.onDelete(employeeId)}>Delete</button>
                </span>}
            </div>
        </React.Fragment >
    )
}

export default EmployeeCard;