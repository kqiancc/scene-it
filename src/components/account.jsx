import { Navigate } from 'react-router-dom';

const Account = ({ user }) => {

	return user ? (
		<div className='flex flex-col items-center h-screen py-40 overflow-y-auto scrollbar'>
			<div className='avatar mb-4 '>
				<div className='flex flex-col w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
					<img className='mask mask-circle ' src={user.photoURL} alt='' />
				</div>
			</div>
			<span className='flex justify-center text-4xl mb-4 '>
				{user.displayName}
			</span>
		</div>
	) : (
		<Navigate to='/login' />
	);
};

export default Account;
