import { useState, useEffect, useRef } from "react";
import { auth, db } from "../store/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const messagesEndRef = useRef(null);

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
    const qu = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(qu, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp?.toDate) return "No timestamp available";
    const date = new Date(timestamp.toDate());
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <ul className=" px-2 flex flex-col gap-2 pb-10">
        {messages.map((message, index) => {
          const isCurrentUser = message.uid === currentUser?.uid;
          return (
            <li
              key={index}
              className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-md ${
                  isCurrentUser ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                {!isCurrentUser && (
                  <span className="block font-bold mb-1">{message.username}</span>
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
    </>
  );
};

export default MessageList;
