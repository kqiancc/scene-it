import { RiGoogleFill } from 'react-icons/ri';
import  {SignInWithGoogle} from './config';

const GoogleLogIn = () => {
	return (
		<div className='flex flex-col'>
			<div>
				<button
					type='submit'
					className='btn btn-wide btn-primary'
					onClick={SignInWithGoogle}>
					<RiGoogleFill className='w-5 h-5' />
					&nbsp; google sign in
				</button>
			</div>
		</div>
	);
};

export default GoogleLogIn;