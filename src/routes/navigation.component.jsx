import {Fragment} from 'react'
import {Outlet, Link} from 'react-router-dom';
import {BsFillPersonFill} from 'react-icons/bs';
import Login from '../firebase/login';
import GoogleLogIn from '../firebase/google-login';

const Navigation = () => {
    return (
    <Fragment>
      <div className="App">
        <div class="navbar bg-base-100">
          <div class="flex-1"> 
            <Link class="btn btn-ghost normal-case text-xl" to = '/'>
                RAJE.TV
                </Link>
            <div className="join">
                <Link className="join-item btn" to="/saved" aria-label="recents">
                    saved
                </Link>
                <Link className="join-item btn" to="/favorites" aria-label="favorites">
                     favorites
                </Link>    
            </div>
          </div>
          <div class="flex-none gap-2">
            <div class="dropdown dropdown-end">
              <Link tabindex="0" class="btn btn-ghost btn-circle avatar" to= '/login'>
                <div>
                <BsFillPersonFill/>
                </div>
              </Link>
              <ul
                tabindex="0"
                class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Outlet/>
      </Fragment>
    );
  }
  
  export default Navigation;
  