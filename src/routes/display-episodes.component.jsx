import React, { useState } from 'react';

const YourComponent = () => {
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" checked="checked" />

        <div className="collapse-title text-xl font-medium">
          <img
            src="/images/stock/photo-1635805737707-575885ab0820.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
            alt="Episode Poster"
          />
          <h1 className="text-2xl font-bold">Episode Title</h1>
          <p className="py-2">Episode Synopsis</p>
        </div>

        <div className="collapse-content">
          <div className="rating gap-1">
            <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
            <input type="radio" name="rating-3" className="mask mask-heart bg-orange-400" />
            <input type="radio" name="rating-3" className="mask mask-heart bg-yellow-400" />
            <input type="radio" name="rating-3" className="mask mask-heart bg-lime-400" />
            <input type="radio" name="rating-3" className="mask mask-heart bg-green-400" />
          </div>

          <div className="flex flex-col w-full">
            <div className="grid h-10 card base-200 rounded-box place-items-left">
            <div className=" place-items-center">
            <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="Personal tags"
                className="input input-bordered input-info w-full max-w-xs"
              />  
           <div className="divider divider-horizontal"></div>
           <div className="badge">{userInput}</div>
            <div className="grid h-10 flex-grow card base-200 rounded-box place-items-center">
           
            </div>
            </div>
          

            </div>
            <div className="divider"></div>
            <div className="grid h-10 card bg-base-200 rounded-box place-items-left">
              <input
                type="text"
                placeholder="Personal notes"
                className="input input-bordered input-primary w-full max-w-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;


// import React, { useState } from 'react';

// const DisplayEpisodes = () => {
    
//   const [userInput, setUserInput] = useState('');

//   const HandleInputChange = (event) => {
//     setUserInput(event.target.value);
//   };


//   return (
//         <div> 
//     <div className="collapse collapse-plus bg-base-200">
//       <input type="radio" name="my-accordion-3" checked="checked" /> 
     
//       <div className="collapse-title text-xl font-medium">
//     <img src="/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
//       <h1 className="text-2xl font-bold">Episode Title</h1>
//       <p className="py-2">Episode Synopsis</p>
//       </div>

//       <div className="collapse-content"> 
     
//       <div className="rating gap-1">
//   <input type="radio" name="rating-3" className="mask mask-heart bg-red-400"  />
//   <input type="radio" name="rating-3" className="mask mask-heart bg-orange-400" />
//   <input type="radio" name="rating-3" className="mask mask-heart bg-yellow-400"  />
//   <input type="radio" name="rating-3" className="mask mask-heart bg-lime-400"  />
//   <input type="radio" name="rating-3" className="mask mask-heart bg-green-400" />
// </div>


//         <div className="flex flex-col w-full">
//         <div className="grid h-10 card bg-base-200 rounded-box place-items-left">
//         <input type="text" placeholder="Personal tags" className="input input-bordered input-info w-full max-w-xs" />
//         </div> 
//         <div className="divider">
//         </div> 
//         <div className="grid h-10 card bg-base-200 rounded-box place-items-left">
//         <input type="text" placeholder="Personal notes" className="input input-bordered input-primary w-full max-w-xs" />  
//         </div>
//         </div>
//       </div>
   


   
   
//     </div>
//     <div className="collapse collapse-plus bg-base-200">
//       <input type="radio" name="my-accordion-3" checked="checked"/> 
//       <div className="collapse-title text-xl font-medium">
//         Click to open this one and close others
//       </div>
//       <div className="collapse-content"> 
//         <p>hello</p>
//       </div>
//     </div>
//     <div className="collapse collapse-plus bg-base-200">
//       <input type="radio" name="my-accordion-3"checked="checked" /> 
//       <div className="collapse-title text-xl font-medium">
//         Click to open this one and close others
//       </div>
//       <div className="collapse-content"> 
//         <p>hello</p>
//       </div>
//     </div>
//     </div>
//   );
//   };



//   <div className="hero min-h-screen bg-base-200">
//   <div className="hero-content flex-col lg:flex-row">
//     <img src="/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
//     <div>
//       <h1 className="text-5xl font-bold">Box Office News!</h1>
//       <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
//       <div className="flex flex-col w-full">
//         <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
//         <input type="text" placeholder="Personal tags" className="input input-bordered input-info w-full max-w-xs" />
//         </div>
//         <div className="divider"></div> 
//         <div className="grid h-20 card bg-base-200 rounded-box place-items-center">
//         <input type="text" placeholder="Personal notes" className="input input-bordered input-primary w-full max-w-xs" />  
//         </div>
//         </div>
//     </div>
//   </div>
  
// </div>



//   export default DisplayEpisodes;


