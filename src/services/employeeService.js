import axios from 'axios';
const apiEndpoint = "/employees";

export function getEmployees() {
    return axios.get(apiEndpoint);
}
export function getEmployee(firstname) {
    return axios.get(apiEndpoint + `/${firstname}`)
}
export function register(employee) {
    return axios.post(apiEndpoint, employee)
}
export function login(employee) {
    return axios.post(apiEndpoint + "/login", employee)
}
export function googleLogin(user) {
    return axios.post(apiEndpoint + "/google-login", { user })
}
export function update(employee) {
    return axios.put(apiEndpoint, employee)
}
export function deleteEmployee(employeeId) {
    return axios.delete(apiEndpoint + `/${employeeId}`)
}