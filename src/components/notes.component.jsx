import { useState, useEffect } from 'react';

const Notes = () => {
    const [userInput, setUserInput] = useState('');

    const HandleInputChange = (event) => {
      setUserInput(event.target.value);
    };

    return(   
        
    <div>    
    <div className="rating rating-lg rating-half">
  <input type="radio" name="rating-10" className="rating-hidden" />
  <input type="radio" name="rating-10" className="bg-red-400 mask mask-star-2 mask-half-1" />
  <input type="radio" name="rating-10" className="bg-red-400 mask mask-star-2 mask-half-2" />
  <input type="radio" name="rating-10" className="bg-orange-400 mask mask-star-2 mask-half-1" />
  <input type="radio" name="rating-10" className="bg-orange-400 mask mask-star-2 mask-half-2" />
  <input type="radio" name="rating-10" className="bg-yellow-400 mask mask-star-2 mask-half-1" />
  <input type="radio" name="rating-10" className="bg-yellow-400 mask mask-star-2 mask-half-2" />
  <input type="radio" name="rating-10" className="bg-green-400 mask mask-star-2 mask-half-1" />
  <input type="radio" name="rating-10" className="bg-green-400 mask mask-star-2 mask-half-2" />
  <input type="radio" name="rating-10" className="bg-blue-400 mask mask-star-2 mask-half-1" />
  <input type="radio" name="rating-10" className="bg-blue-400 mask mask-star-2 mask-half-2" />
</div>

  <div className="flex flex-col w-full">
    <div className="grid h-10 card base-200 rounded-box place-items-left">
      <div className="place-items-center">
        <input
          type="text"
          value={userInput}
          onChange={HandleInputChange}
          placeholder="Personal tags"
          className="input input-bordered input-info w-full max-w-xs"
        />
        <div className="divider divider-horizontal"></div>
        <div className="badge badge-secondary">{userInput}</div>
        <div className="grid h-10 flex-grow card base-100 rounded-box place-items-center">
        </div>
      </div>
    </div>
  </div>

  <div className="divider"></div>

  <div>
    <input
      type="text"
      placeholder="Personal notes"
      className="input input-bordered input-primary w-full max-w-xs"
    />
  </div>
</div>
);};

export default Notes