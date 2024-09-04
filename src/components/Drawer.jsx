import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsDropDwonOpen } from "../store/slice/navSlice";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "../pages/auth/LogoutBtn";
import Profile from "../pages/Profile";
import Theme from "./Theme";

const Drawer = () => {
  const navigate = useNavigate();
  const isDropDownOpen = useSelector((state) => state.nav.isDropDownOpen);
  const dispatch = useDispatch();

  return (
    <div
    id="drawer-example"
    className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform transform ${
      isDropDownOpen ? "translate-x-0 lg:-translate-x-48" : "translate-x-full"
    } bg-white dark:bg-darkPrimary w-80`}
    tabIndex={-1}
    aria-labelledby="drawer-label"
  >
      <div className="flex items-center justify-between mb-4">
        <h5 id="drawer-label" className="text-base font-semibold text-primary">
          <svg
            className="w-4 h-4 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          Info
        </h5>
        <button
          onClick={() => dispatch(setIsDropDwonOpen(false))}
          type="button"
          aria-controls="drawer-example"
          className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 focus:outline-none dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1l6 6m0 0l6 6M7 7L1 13m6-6L1 1"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
      </div>

      <Profile />

      <ul className="space-y-4 mt-6">
        <li>
          <Theme />
        </li>
        <li>
          <LogoutBtn />
        </li>
      </ul>
    </div>
  );
};

export default Drawer;
