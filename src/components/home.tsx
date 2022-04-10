import React, { ChangeEvent, useEffect, useState } from 'react';
import { getEmployees } from "../services/employeeService";
import jwtDecode from 'jwt-decode';
import Header from "./header";
import Card from "./card";
import { deleteEmployee } from '../services/employeeService';


function Home() {

    const [employeesArray, setEmployeesArray] = useState<any[]>([]);
    const [userSearch, setUserSearch] = useState('');
    const [user, setUser] = useState();
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        getAllEmployeesArray();
        try {
            const token: any = localStorage.getItem('token');
            const employee: any = jwtDecode(token);
            if (employee.userType === "admin") {
                setAdmin(true);
            }
            setUser(employee);
        } catch (e) { }
    }, []);

    async function getAllEmployeesArray() {
        const { data } = await getEmployees();
        setEmployeesArray(data);
    };

    const handleDelete = async (id: number) => {
        await deleteEmployee(id);
        const employees = employeesArray.filter(e => e.employeeId !== id);
        setEmployeesArray(employees);
    }
    function getEmployeesData() {
        const allEmployees = employeesArray;
        let filtered = employeesArray;

        userSearch
            ? filtered = allEmployees.filter(e => e.firstName.toLowerCase().startsWith(userSearch.toLowerCase()))
            : filtered = allEmployees.filter(e => e);

        return { data: filtered }
    }
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setUserSearch(event.target.value);
    }

    const { data: employees } = getEmployeesData();
    return (
        <React.Fragment>
            <Header employee={user} />
            <main className="container home" >
                <img src={require("../assets/glass.png")} width={25} /><input
                    type='text'
                    className="search-input"
                    placeholder='Search...'
                    onChange={handleSearch} />
                {!employees.length
                    ? <div>No employees are register already</div>
                    : <div><span style={{ color: "#0070ba", fontSize: 22 }}>{employees.length}</span>  employees are register to the system until now!</div>}
                {employees.map((e, index) => (
                    <Card
                        key={index}
                        firstName={e.firstName}
                        lastName={e.lastName}
                        email={e.email}
                        employeeId={e.employeeId}
                        admin={admin}
                        onDelete={() => handleDelete(e.employeeId)}
                    />
                ))}
            </main>
        </React.Fragment>
    )
}
export default Home;
