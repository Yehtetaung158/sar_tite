import React, { useEffect, useState } from "react";
import userIcon from "../assets/user-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import useUserHook from "../Hooks/useUserHook";
import EditProfil from "../components/EditProfil";

const Profile = () => {
  const nav = useNavigate();
  const { currentUser } = useUserHook();
  const [isProfileDetail, setIsProfileDetail] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <section className="text-gray-600 body-font border-b-2 py-2">
        {isEdit ? <>
        <EditProfil setIsEdit={setIsEdit}/>
        </> : <>
        <div
          onClick={() => setIsProfileDetail(!isProfileDetail)}
          className={`container mx-auto flex ${
            isProfileDetail && "flex-col"
          } items-center justify-center gap-2`}
        >
          <img
            className=" w-[100px] object-cover object-center rounded"
            alt="hero"
            src={currentUser?.photoURL ||userIcon}
            style={{ filter: "invert(0)" }}
          />
          <div
            className={` ${
              isProfileDetail
                ? " text-center space-y-3"
                : "text-start space-y-1"
            } lg:w-2/3 w-full `}
          >
            <h1 className="title-font sm:text-2xl text-3xl font-medium text-gray-900 dark:text-white">
              {currentUser?.displayName}
            </h1>
            <p className=" dark:text-white">{currentUser?.email}</p>
            {isProfileDetail && (
              <button onClick={()=>setIsEdit(true)} className=" inline-flex text-gray-700 bg-gray-100 border-0 py-1 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Edit
              </button>
            )}
          </div>
        </div>
        </>}
      </section>
    </>
  );
};

export default Profile;
