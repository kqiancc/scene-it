import { Fragment, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { themeChange } from "theme-change";
import ThemePicker from "../components/theme-picker";
import {
  RiUser3Line,
  RiLogoutBoxLine,
  RiHeartLine,
  RiDownload2Line,
  RiPlayList2Line,
  } from "react-icons/ri";
import {PiTelevision} from "react-icons/pi";
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
          <div class="flex items-center space-x-4">
            <Link class="btn btn-ghost normal-case h-20 text-xl" to="/">
              <PiTelevision className="w-10 h-10" />
            </Link>
            <div className="join">
              <BackButton />
              <ForwardButton />
              <Link className="join-item btn" to="/saved" aria-label="recents">
                <RiDownload2Line />
                saved
              </Link>
              <Link
                className="join-item btn"
                to="/favorites"
                aria-label="favorites"
              >
                <RiHeartLine />
                favorites
              </Link>
              <Link
              className = "join-item btn"
              to="/to-watch"
              aria-label = "to-watch">
                <RiPlayList2Line/>
                to watch
              </Link>
              <ThemePicker />
            </div>

            {user ? (
              <div className="absolute top-5 right-5">
                <div className="dropdown dropdown-bottom dropdown-end ">
                  <button tabIndex={-1}>
                    <RiUser3Line className="w-5 h-10" />
                  </button>
                  <ul
                    tabIndex={-1}
                    className="w-32 p-2 shadow dropdown-content menu bg-secondary rounded-box"
                  >
                    <li className = "m-1 text-center">
                      {user.displayName}
                    </li>
                    <li className = "m-1 text-center">
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
