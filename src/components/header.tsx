import React from 'react';
import { Link } from "react-router-dom";

export interface IHeader {
    lastName?: string;
    firstName?: string;
    employee: any
};

function Header(props: IHeader) {
    const user = props.employee;
    return (
        <div className="header row">
            <div className="col-md-6 col-lg-10 col-xl-12">
                <div>
                    <Link className="navbar-brand" to="/home" style={{ marginLeft: 15 }}><img src={require("../assets/home.png")} width={50} /></Link>
                    {!user && <React.Fragment>
                        <Link to="/login"><button className="btn-navbar" style={{ backgroundColor: "#0070ba", color: "white" }}>Login</button></Link>
                        <Link to="/register"><button className="btn-navbar col-lg-8">Register</button></Link>
                    </React.Fragment>}

                    {user && <React.Fragment>
                        <Link to="/logout"><button className="btn-navbar">logout</button></Link>
                        <span style={{ textDecoration: "none" }}>{props.employee.firstName} {props.employee.lastName}</span>
                    </React.Fragment>}
                </div>
            </div>
        </div>
    );
}
export default Header;
