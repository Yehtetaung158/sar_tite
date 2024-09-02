import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "../pages/auth/LogoutBtn";
import MenuIcon from "../assets/menu-alt-2-svgrepo-com.svg";
import LogoIcon from "../assets/mail-mailbox-svgrepo-com.svg";
import { useDispatch } from "react-redux";
import { setIsDropDwonOpen } from "../store/slice/navSlice";
const Nav = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className=" mx-auto flex flex-wrap py-2 px-2 flex-row items-center justify-between">
          <a className="flex title-font font-medium items-center text-gray-900 ">
            <img className=" size-12" src={LogoIcon} alt="" />
            <span className="ml-3 text-xl">Sar Tite</span>
          </a>
          <div className=" flex gap-2">
            <button
              onClick={() => dispatch(setIsDropDwonOpen(true))}
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base"
            >
              <img className=" size-6" src={MenuIcon} alt="" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Nav;
