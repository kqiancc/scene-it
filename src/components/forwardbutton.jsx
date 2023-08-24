import { RiArrowGoForwardLine } from "react-icons/ri";

const ForwardButton = () => {
  const goForward = () => {
    window.history.forward(); // Navigate forward by one entry in the history stack
  };

  return (
    <div onClick={goForward}>
      <RiArrowGoForwardLine className='w-4 h-4' />
    </div>
  );
};

export default ForwardButton;
