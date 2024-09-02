import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import ChatRoom from "../components/ChatRoom";
import PeopleList from "../components/PeopleList";
import useUserHook from "../Hooks/useUserHook";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Drawer from "../components/Drawer";

const HomePage = () => {
  const [ischatRoom, setIsChatRoom] = useState(true);
  const nav = useNavigate();
  const { currentUser, isError, isLoading } = useUserHook();

  useEffect(() => {
    if (currentUser) {
      nav("/home");
    } else if (!isLoading) {
      nav("/login");
    }
  }, [currentUser, nav]);

  return (
    <div className=" min-h-screen w-full lg:w-[1144px] mx-auto bg-green-200 flex  flex-col relative">
      <div className="  bg-gray-300">{<Nav />}</div>
      <div className=" w-full sticky top-0 left-0 right-0 bg-gray-200 flex px-2 py-2 z-40">
        <button
          onClick={() => setIsChatRoom(true)}
          className={` w-1/2 text-center ${
            ischatRoom && " border-2  border-gray-800 font-bold"
          } py-1`}
        >
          People
        </button>
        <button
          onClick={() => setIsChatRoom(false)}
          className={` w-1/2 text-center ${
            !ischatRoom && " border-2  border-gray-800 font-bold"
          } py-1`}
        >
          Public Chat Room
        </button>
      </div>

      {ischatRoom ? (
        <div className="w-full">
          <PeopleList />
        </div>
      ) : (
        <div className="w-full">
          <ChatRoom />
        </div>
      )}
      <Drawer/>
    </div>
  );
};

export default HomePage;
