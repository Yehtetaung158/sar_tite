import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../store/firebase";
import PrivateSentbox from "./PrivateSentbox";
import PrivateMessages from "./PrivateMessages";
import useUserHook from "../Hooks/useUserHook";
import useUserLists from "../Hooks/useUserLists";
import unknownUser from "../assets/user-svgrepo-com.svg";

const UserList = ({ isUserLists, setIsUserLists }) => {
  const [currentUid, setCurrentUid] = useState(null);
  const { currentUser } = useUserHook();
  const { users, isError, isLoading } = useUserLists();
  console.log("UserList",isError,isLoading,users)

  const createChatRoom = async (user) => {
    try {
      const chatRoomUid = [currentUser.uid, user.id].sort().join("_");
      await setDoc(
        doc(db, "chatRooms", chatRoomUid),
        {
          displayName: user.displayName || "Anonymous",
          email: user.email,
          profilePicture: user.profilePicture || "",
          lastLogin: new Date(),
        },
        { merge: true }
      );
      setCurrentUid(chatRoomUid);
      setIsUserLists(false);
      console.log("Chat room created with ID:", chatRoomUid);
    } catch (e) {
      console.log("Error creating chat room", e.message);
    }
  };

  const getChatRoom = async (chatRoomUid, user) => {
    try {
      const chatRoomSnapshot = await getDoc(doc(db, "chatRooms", chatRoomUid));
      if (chatRoomSnapshot.exists()) {
        setIsUserLists(false);
        console.log("Chat room exists:", chatRoomUid);
      } else {
        await createChatRoom(user);
      }
    } catch (e) {
      console.log("Error getting chat room", e.message);
    }
  };

  const createPrivateChatRoom = async (user) => {
    const chatRoomUid = [currentUser?.uid, user?.id].sort().join("_");
    setCurrentUid(chatRoomUid);
    if (chatRoomUid) {
      console.log("Creating or getting chat room for UID:", chatRoomUid);
      await getChatRoom(chatRoomUid, user);
    }
  };

  return (
    <div className="w-full relative">
      {isUserLists ? (
        <div className="p-4">
          <ul className=" w-full divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <li key={user.id} className="pb-3 sm:pb-4">
                <button
                  onClick={() => createPrivateChatRoom(user)}
                  className="flex justify-between w-full items-center space-x-4 rtl:space-x-reverse"
                >
                  <div className="flex gap-2">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={user.photoURL || unknownUser}
                        alt={`${
                          user.displayName || "Anonymous"
                        }'s profile picture`}
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-start">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {user.displayName || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {user.email || "No email available"}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center text-base font-semibold dark:text-white text-indigo-400">
                    detail
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-auto">
            <PrivateMessages currentUid={currentUid} />
          </div>

          <div className=" w-full fixed bottom-0 left-0 right-0">
            <PrivateSentbox
              currentUid={currentUid}
              currentUser={currentUser}
              setIsUserLists={setIsUserLists}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
