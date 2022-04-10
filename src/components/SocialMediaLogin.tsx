import React from 'react';
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useHistory } from 'react-router-dom';
import { googleLogin } from "../services/employeeService";

export interface ISocial {
    token: any,
}
function SocialMediaLogin(props: ISocial) {
    const history = useHistory();
    const { token } = props;
    const clientId:any = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    const handleGoogleLogin = async (googleData: any) => {
        const token = googleData.tokenId;
        const { data } = await googleLogin(token);
        localStorage.setItem('token', data);
        history.push("/home")
    };
    const hanldeLogout = () => {
        history.push("/logout")
    }
    const handleFailure = (result: any) => {
        alert(result);
    };

    return (
        <React.Fragment>
            {!token
                ? <GoogleLogin
                    clientId='14210193484-rnh2udued7jgvrcomvue7vis0e63dp0f.apps.googleusercontent.com'
                    buttonText="login"
                    onSuccess={handleGoogleLogin}
                    onFailure={handleFailure}
                    cookiePolicy={'single_host_origin'} />
                : <GoogleLogout
                    clientId='14210193484-rnh2udued7jgvrcomvue7vis0e63dp0f.apps.googleusercontent.com'
                    buttonText="logout"
                    onLogoutSuccess={hanldeLogout} />}
        </React.Fragment>
    )
}
export default SocialMediaLogin;