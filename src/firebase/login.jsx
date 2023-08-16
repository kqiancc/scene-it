import { Navigate } from 'react-router-dom';
import GoogleLogIn from './google-login';
import Spinner from './spinner';

const Login = ({ user, loading, error }) => {
	return (
		<div className='fixed inset-0 flex items-center justify-center mt'>
			{user && <Navigate to='/' />}
			{loading ? <Spinner /> : <GoogleLogIn />}
		</div>
	);
};

export default Login;