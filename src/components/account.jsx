import { Navigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
// import AccountGameStats from './account-gamestats';
// import Button from '../button/button';
// import { acc, sum, wpm, cps, getBests } from './statsHelpers';
// import Spinner from '../spinner/spinner';

const Account = ({ user }) => {
	const [mode, setMode] = useState('all');
	const [stats, setStats] = useState(false);

	// useEffect(() => { //how to laod in the initial data
	// 	async function fetchData() {
	// 		const s = await getStats();
	// 		setStats(s);
	// 	}
	// 	fetchData();
	// }, [setStats]);

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
