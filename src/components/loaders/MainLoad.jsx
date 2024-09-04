import React from "react";
import LogoIcon from "../../assets/mail-mailbox-svgrepo-com.svg";

const MainLoad = () => {
  return (
    <div className=" text-black bg-secondary w-full h-full fixed flex gap-2 justify-center items-center ">
      <img className=" size-16" src={LogoIcon} alt="" />
      <div className="loader"></div>
    </div>
  );
};

export default MainLoad;
