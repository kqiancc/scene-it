import { RiArrowGoBackLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div onClick={goBack}>
      <RiArrowGoBackLine className='w-4 h-4' />
    </div>
  );
};

export default BackButton;
