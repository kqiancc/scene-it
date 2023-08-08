import { RiLoader5Line } from 'react-icons/ri';

const Spinner = () => {
	return (
		<div className='flex justify-center items-center animate-spin'>
			<RiLoader5Line className='w-10 h-10' />
		</div>
	);
};

export default Spinner;