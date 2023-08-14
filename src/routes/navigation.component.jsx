import { Fragment, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { themeChange } from "theme-change";
import ThemePicker from "../components/theme-picker";
import {
  RiUser3Line,
  RiLogoutBoxLine,
  RiHeartLine,
  RiSettings2Line,
  RiDownload2Line,
  } from "react-icons/ri";
import { logout } from "../firebase/firebase";
import ForwardButton from "../components/forwardbutton";
import BackButton from "../components/backbutton";

const Navigation = ({ user }) => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <Fragment>
      <div className="App">
        <div>
          <div class="flex-1">
            <Link class="btn btn-ghost normal-case h-20 text-xl" to="/">
              RAJE.TV
            </Link>
            <div className="join">
              <BackButton/>
              <Link className="join-item btn" to="/saved" aria-label="recents">
                <RiDownload2Line/>
                saved
              </Link>
              <Link
                className="join-item btn"
                to="/favorites"
                aria-label="favorites"
              >
                <RiHeartLine/>
                favs
              </Link>
              <ThemePicker />{" "}
              <ForwardButton/>
            </div>

            {user ? (
              <div className="absolute top-5 right-5">
                <div className="dropdown dropdown-bottom dropdown-end ">
                  <button tabIndex={-1}>
                    <RiUser3Line className="w-5 h-10" />
                  </button>
                  <ul
                    tabIndex={-1}
                    className="dropdown-content menu p-2 shadow bg-secondary rounded-box w-32"
                  >
                    <li>
                      <Link to="/account" tabIndex={-1}>
                        <RiSettings2Line className="w-5 h-5" />
                        settings
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
                <button className="absolute top-5 right-5" tabIndex={-1}>
                  <RiUser3Line className="w-5 h-10" />
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
