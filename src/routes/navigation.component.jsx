import { Fragment, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { themeChange } from "theme-change";
import ThemePicker from "../components/theme-picker";
import { BsFillPersonFill } from "react-icons/bs";
import {
  RiGithubLine,
  RiUser3Line,
  RiLogoutBoxLine,
  RiBarChart2Line,
} from "react-icons/ri";
import { logout } from "../firebase/firebase";

const Navigation = ({ user }) => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <Fragment>
      <div className="App">
        <div class="navbar bg-base-100">
          <div class="flex-1">
            <Link class="btn btn-ghost normal-case text-xl" to="/">
              RAJE.TV
            </Link>
            <div className="join">
              <Link className="join-item btn" to="/saved" aria-label="recents">
                saved
              </Link>
              <Link
                className="join-item btn"
                to="/favorites"
                aria-label="favorites"
              >
                favorites
              </Link>
              <ThemePicker /> {/*TODO: make it not round and also make it work*/}
             
            </div>

            {user ? (
              <div className="absolute right-0 pr-5 pt-3 ">
                <div className="dropdown dropdown-bottom dropdown-end ">
                  <button tabIndex={-1}>
                    <RiUser3Line className="w-5 h-5" />
                  </button>
                  <ul
                    tabIndex={-1}
                    className="dropdown-content menu p-2 shadow bg-primary rounded-box w-32"
                  >
                    <li>
                      <Link to="/account" tabIndex={-1}>
                        <RiBarChart2Line className="w-5 h-5" />
                        stats
                      </Link>
                    </li>
                    <li>
                      <button onClick={logout}>
                        <RiLogoutBoxLine className="w-5 h-5" />
                        logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <button className="absolute right-0 pr-5 pt-3 " tabIndex={-1}>
                  <RiUser3Line className="w-5 h-5" />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
