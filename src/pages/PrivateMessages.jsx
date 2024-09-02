import { useState, useEffect, useRef } from "react";
import { auth, db } from "../store/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const PrivateMessages = ({ currentUid }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);

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

  useEffect(() => {
    const qu = query(
      collection(db, "chatRooms", currentUid, "messages"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(qu, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, [currentUid]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp?.toDate) return "No timestamp available";
    const date = new Date(timestamp.toDate());
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex-grow overflow-y-auto px-4 pb-10">
      <ul className="space-y-3">
        {messages.map((message, index) => {
          const isCurrentUser = message.uid === currentUser?.uid;
          console.log(currentUser?.uid);
          return (
            <li
              key={index}
              className={`flex ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-md ${
                  isCurrentUser
                    ? " bg-gray-900 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {!isCurrentUser && (
                  <span className="block font-semibold mb-1">
                    {message.username}
                  </span>
                )}
                <span className="block">{message.text}</span>
                <span className="text-xs text-gray-400 mt-1 block text-right">
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
            </li>
          );
        })}
        <div ref={messagesEndRef} />
      </ul>
    </div>
  );
};

export default PrivateMessages;
