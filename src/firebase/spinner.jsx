import { RiLoader5Line } from 'react-icons/ri';

const Spinner = () => {
    return (
        <div className='fixed inset-0 flex items-center justify-center'>
            <RiLoader5Line className='w-10 h-10 animate-spin' />
        </div>
    );
};

export default Spinner;
