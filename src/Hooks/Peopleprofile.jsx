import React from "react";
import useUserLists from "./useUserLists";
import { useDispatch, useSelector } from "react-redux";
import { setisPeopleDetail } from "../store/slice/navSlice";
// import unKnownIcon from "../assets/user-svgrepo-com.svg"
import unKnownIcon from "../assets/people-unknown-svgrepo-com.svg"

const Peopleprofile = () => {
  const dispathc=useDispatch()
  const { isError, isLoading, users } = useUserLists();
  const isPeopleDetail = useSelector((state) => state.nav.isPeopleDetail);
  const currentPeopleId = useSelector((state) => state.nav.currentPeopleId);
  const currentPerson = users?.find((p) => p.id === currentPeopleId);
  console.log(currentPerson);

  return (
    <div className=" relative h-full flex justify-center ">
      <button
      className=" absolute top-2 right-2"
      onClick={()=>dispathc(setisPeopleDetail(!isPeopleDetail))}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 dark:text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className=" flex flex-col justify-center items-center gap-4">
        <img className=" w-2/3" src={currentPerson?.profilePicture || unKnownIcon} alt="" />
        <h1 className=" text-darkPrimary text-2xl font-bold dark:text-white">{currentPerson?.displayName || "Annamous"}</h1>
        <p className=" text-darkPrimary dark:text-white">{currentPerson?.email || "no Email"}</p>

      </div>
    </div>
  );
};

export default Peopleprofile;
