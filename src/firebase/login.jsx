import { Navigate } from 'react-router-dom';
import GoogleLogIn from './google-login';
import Spinner from './spinner';

const Login = ({ user, loading, error }) => {
	return (
		<div className='flex items-center h-screen justify-center'>
			{user && <Navigate to='/' />}
			{loading ? <Spinner /> : <GoogleLogIn />}
		</div>
	);
};

export default Login;