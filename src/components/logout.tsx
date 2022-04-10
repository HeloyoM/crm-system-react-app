import React, { useEffect } from 'react';
export interface ILogout {
    history: any
}
function Logout(props: ILogout) {
    useEffect(() => {
        localStorage.removeItem('token')
        props.history.push("/login")
    }, [])
    return null;
}

export default Logout;

