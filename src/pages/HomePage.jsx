import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import ChatRoom from "../components/ChatRoom";
import PeopleList from "../components/PeopleList";
import useUserHook from "../Hooks/useUserHook";
import { useNavigate } from "react-router-dom";
import Drawer from "../components/Drawer";
import Peopleprofile from "../Hooks/Peopleprofile";
import { useSelector } from "react-redux";
import 'animate.css';

const HomePage = () => {
  const [isChatRoom, setIsChatRoom] = useState(true);
  const navigate = useNavigate();
  const { currentUser, isError, isLoading } = useUserHook();
  const isPeopleDetail = useSelector((state) => state.nav.isPeopleDetail);
  // const currentPeopleId = useSelector((state) => state.nav.currentPeopleId);

  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate("/login");
    }
  }, [currentUser, isLoading, navigate]);

  return (
    <div className="min-h-screen w-full lg:w-[1144px] mx-auto bg-[#ffff] dark:bg-darkBg flex flex-col relative">
      <div className="sticky top-0 left-0 right-0 z-30">
        <Nav />
        <div className="w-full bg-secondary dark:bg-darkPrimary dark:text-darkText1 flex px-2 py-2 z-40">
          <button
            onClick={() => setIsChatRoom(true)}
            className={`w-1/2 text-center py-1 ${
              isChatRoom &&
              "border-2 border-gray-800 dark:border-darkText1 font-bold"
            }`}
          >
            People
          </button>
          <button
            onClick={() => setIsChatRoom(false)}
            className={`w-1/2 text-center py-1 ${
              !isChatRoom &&
              "border-2 border-gray-800 dark:border-darkText1 font-bold"
            }`}
          >
            Public Chat Room
          </button>
        </div>
      </div>
      <div className="w-full flex-grow">
        {isChatRoom ? <PeopleList /> : <ChatRoom />}
      </div>
      <Drawer />
      {isPeopleDetail && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-white dark:bg-darkPrimary bg-opacity-75 dark:bg-opacity-75">
            <div className="h-[400px] w-[300px] bg-white dark:bg-darkPrimary rounded-lg shadow-lg animate__bounceIn">
              <Peopleprofile />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
