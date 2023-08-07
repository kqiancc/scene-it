import {useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";


const SignIn = ()=> {
  const [user, setUser] = useState({});


  function handleCallBackResponse(response){
    console.log("Endcoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
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
      <div className="App">
        <div id="signInDiv"></div> 
          {user &&
         <div>
            <h3 className="text-lg font-semibold mt-2">{user.name}</h3>
         </div> }
         {Object.keys(user).length != 0 &&
         <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none mt-4"
         onClick={(e) => handleSignOut(e)}>sign out
         </button> }
      </div>
    );
  }
  
  export default SignIn;

