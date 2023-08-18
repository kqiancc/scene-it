import { RiLoader5Line } from 'react-icons/ri';

const Spinner = () => {
    return (
        <div className='flex items-center justify-center p-0 m-96 h-1/2'>
            <RiLoader5Line className='w-10 h-10 animate-spin' />
        </div>
    );
};

export default Spinner;
