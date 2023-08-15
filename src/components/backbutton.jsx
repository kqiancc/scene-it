import { RiArrowGoBackLine } from 'react-icons/ri';
import {useNavigate} from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div onClick={goBack} className="join-item btn bg-base-200">
      <RiArrowGoBackLine />
    </div>
  );
};

export default BackButton;
