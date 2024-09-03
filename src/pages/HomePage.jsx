import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import ChatRoom from "../components/ChatRoom";
import PeopleList from "../components/PeopleList";
import useUserHook from "../Hooks/useUserHook";
import { useNavigate } from "react-router-dom";
import Drawer from "../components/Drawer";

const HomePage = () => {
  const [ischatRoom, setIsChatRoom] = useState(true);
  const nav = useNavigate();
  const { currentUser, isError, isLoading } = useUserHook();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      nav("/login");
    }
  }, [currentUser, isLoading, nav]);

  return (
    <div className="min-h-screen w-full lg:w-[1144px] mx-auto bg-[#ffff] dark:bg-darkBg  flex flex-col relative">
      <div className="sticky top-0 left-0 right-0 z-50">
      <Nav />
      <div className="w-full bg-secondary dark:bg-darkPrimary dark:text-darkText1 flex px-2 py-2 z-40">
        <button
          onClick={() => setIsChatRoom(true)}
          className={`w-1/2 text-center py-1 ${
            ischatRoom
              ? "border-2 border-gray-800  dark:border-darkText1 font-bold"
              : ""
          }`}
        >
          People
        </button>
        <button
          onClick={() => setIsChatRoom(false)}
          className={`w-1/2 text-center py-1 ${
            !ischatRoom
              ? "border-2 border-gray-800 dark:border-white font-bold"
              : ""
          }`}
        >
          Public Chat Room
        </button>
      </div>
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
      <Drawer />
    </div>
  );
};

export default HomePage;
