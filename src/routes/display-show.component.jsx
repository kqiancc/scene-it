const DisplayShow = () => {
    return (
<div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <img src="/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">Box Office News!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <div className="flex flex-col w-full">
        <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
        <input type="text" placeholder="Personal tags" className="input input-bordered input-info w-full max-w-xs" />
        </div>
        <div className="divider"></div> 
        <div className="grid h-20 card bg-base-200 rounded-box place-items-center">
        <input type="text" placeholder="Personal notes" className="input input-bordered input-primary w-full max-w-xs" />  
        </div>
        </div>
    </div>
  </div>
  
</div>

    );
  };
  
  export default DisplayShow;