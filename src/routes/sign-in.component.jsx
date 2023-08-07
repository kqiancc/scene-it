import {useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";


const SignIn = ()=> {
  const [user, setUser] = useState({});


  function handleCallBackResponse(response){
    console.log("Endcoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event){
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /*global google */
      google.accounts.id.initialize({
        client_id: "413478727577-gogd5kqle8aei8vib8kko8c35erkd6a1.apps.googleusercontent.com",
        callback: handleCallBackResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {theme: "outline", size: "large"}
      );
  
        google.accounts.id.prompt();

  },[])
  //if we have no user, sign in button
  //if have user, show log out button

 

    return (
      <div id="signInDiv"></div>
// {/* <div className="hero min-h-screen bg-base-200"> */}
//   {/* <div className="hero-content flex-col lg:flex-row-reverse">
//     <div className="text-center">
//          </div>
//     <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
//       <div className="card-body">
//         <div className="form-control "> */}
   
//       {/* {Object.keys(user).length != 0 &&
//       <button onClick= {(e) => handleSignOut(e)}> Sign Out</button>}
//         </div>   
//         <div className="form-control mt-6">
//           <button className="btn btn-primary">Login</button>
//         </div>
//       </div>
//     </div>
//   </div> */}
// </div>
    );
  }
  
  export default SignIn;