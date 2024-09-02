import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../store/firebase";
import PrivateSentbox from "./PrivateSentbox";
import PrivateMessages from "./PrivateMessages";

const UserList = ({ isUserLists, setIsUserLists }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUid, setCurrentUid] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const createChatRoom = async (user) => {
    try {
      const chatRoomUid = [currentUser.uid, user.id].sort().join("_");
      await setDoc(
        doc(db, "chatRooms", chatRoomUid),
        {
          displayName: user.displayName || "Anonymous",
          email: user.email,
          profilePicture: user.photoURL || "",
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
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user.id}>
                <button
                  onClick={() => createPrivateChatRoom(user)}
                  className=" bg-gray-400 text-white px-4 py-2 w-full text-start rounded-md"
                >
                  {user.displayName || "Anonymous"}
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
            <PrivateSentbox currentUid={currentUid} currentUser={currentUser} />
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
