import {Fragment} from 'react'
import {Outlet, Link} from 'react-router-dom';
import {ReactComponent as CrwnLogo } from '../assets/crown.svg'
import Home from './home.component';

const Navigation = () => {
    return (
    //     <Fragment>
    //     <div className="navigation">
    //       <Link className = 'logo-container' to = '/'>
    //       <CrwnLogo className = 'logo'/>
    //       </Link>
    //       <div className="nav-links-container">
    //         <Link className="nav-link" to="/recents">
    //           recents
    //         </Link>
    //         <Link className = 'nav-link' to= '/sign-in'>
    //           sign in
    //         </Link>
    //       </div>
    //     </div>
    //     <Outlet />
    //   </Fragment>)}

    <Fragment>
      <div className="App">
        <div class="navbar bg-base-100">
          <div class="flex-1"> 
            <Link class="btn btn-ghost normal-case text-xl" to = '/'>
                RAJE
                </Link>
            <div className="join">
                <Link className="join-item btn" to="/recents" aria-label="recents">
                    recents
                </Link>
                <Link className="join-item btn" to="/favorites" aria-label="favorites">
                     favorites
                </Link>    
            </div>
          </div>
          <div class="flex-none gap-2">

            <div className="drawer drawer-end">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">filters</label>
                </div> 
                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                    </ul>
                </div>
                </div> 
            <div class="form-control">
              <input
                type="text"
                placeholder="Search"
                class="input input-bordered w-24 md:w-auto"
              />
             
            </div>
            <div class="dropdown dropdown-end">
              <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                  <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </label>
              <ul
                tabindex="0"
                class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a class="justify-between">
                    Profile
                    <span class="badge">New</span>
                  </a>
                </li>
                <li>
                <Link to="/sign-in">Sign In</Link>
                </li>
                <li>
                  <a>Logout</a>
                </li>
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
  