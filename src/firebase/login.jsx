import { Outlet, Navigate } from 'react-router-dom';
import GoogleLogIn from './google-login';
import Spinner from './spinner';
import { Fragment } from "react";


const Login = ({ user, loading, error }) => {
	return (
		<div className='flex items-center justify-center p-0 m-96 h-1/2'>
    {user && <Navigate to='/' />}
    {loading ? <Spinner /> : <GoogleLogIn />}
</div>

	);
};


export default Login;