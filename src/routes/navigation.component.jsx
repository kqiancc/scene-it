import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import ThemePicker from "../components/theme-picker";
import {
  RiUser3Line,
  RiLogoutBoxLine,
  RiHeartLine,
  RiDownload2Line,
  RiMenu2Line,
} from "react-icons/ri";
import { PiPopcorn } from "react-icons/pi";
import { logout } from "../firebase/firebase";
import ForwardButton from "../components/forwardbutton";
import BackButton from "../components/backbutton";

const Navigation = ({ user }) => {
  return (
    <Fragment>
      <div className='mb-4 navbar'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost lg:hidden'>
              <RiMenu2Line className='w-4 h-4' />
            </label>
            <ul
              tabIndex={0}
              className='menu dropdown-content z-[1] p-2 shadow bg-base-200 rounded-box'
            >
              <li>
                <BackButton />
              </li>
              <li tabindex='0'>
                <ForwardButton />
              </li>
              <li>
                <Link to='/saved' aria-label='recents'>
                  <RiDownload2Line className='w-4 h-4' />
                </Link>
              </li>
              <li>
                <Link to='/favorites' aria-label='favorites'>
                  <RiHeartLine className='w-4 h-4' />
                </Link>
              </li>
              <li>
                <ThemePicker />
              </li>
            </ul>
          </div>
          <ul className='hidden px-1 menu menu-horizontal rounded-box lg:flex'>
            <li>
              <BackButton />
            </li>
            <li tabindex='0'>
              <ForwardButton />
            </li>
            <li>
              <Link to='/saved' aria-label='recents'>
                <RiDownload2Line className='w-4 h-4' />
              </Link>
            </li>
            <li>
              <Link to='/favorites' aria-label='favorites'>
                <RiHeartLine className='w-4 h-4' />
              </Link>
            </li>
            <li>
              <ThemePicker />
            </li>
          </ul>
        </div>
        <Link className='btn btn-ghost navbar-center lg:flex' to='/'>
          <PiPopcorn className='w-10 h-10' />
        </Link>
        <div className='navbar-end'>
          {user ? (
            <div className='dropdown dropdown-bottom dropdown-end '>
              <button className='btn btn-ghost' tabIndex={-1}>
                <RiUser3Line className='w-4 h-4' />
              </button>
              <ul
                tabIndex={-1}
                className='w-32 p-2 shadow dropdown-content menu bg-base-200 rounded-box'
              >
                <li className='m-1 text-center'>{user.displayName}</li>
                <li className='m-1 text-center'>
                  <button onClick={logout}>
                    <RiLogoutBoxLine className='w-5 h-5' />
                    logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link className='btn btn-ghost' to='/login'>
              <RiUser3Line className='w-4 h-4' />
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
