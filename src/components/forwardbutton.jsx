import { RiArrowGoForwardLine } from 'react-icons/ri';

const ForwardButton = () => {
  const goForward = () => {
    window.history.forward(); // Navigate forward by one entry in the history stack
  };

  return (
    <div onClick={goForward} className="join-item btn bg-base-200">
      <RiArrowGoForwardLine />
    </div>
  );
};

export default ForwardButton;
