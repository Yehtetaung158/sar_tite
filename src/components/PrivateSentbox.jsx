import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../store/firebase";

const PrivateSentbox = ({ currentUid, currentUser, setIsUserLists }) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false); 
  const messageSentHandle = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);

    try {
      const messagePath = collection(db, "chatRooms", currentUid, "messages");
      await addDoc(messagePath, {
        text: message,
        uid: currentUser.uid,
        timestamp: Timestamp.now(),
        username: currentUser.displayName || "Anonymous",
      });
    } catch (e) {
      console.error("Failed to send message:", e.message);
    } finally {
      setMessage(""); 
      setIsSending(false);
    }
  };

  return (
    <section className="text-gray-600 body-font bg-gray-300">
      <form
        onSubmit={messageSentHandle}
        className="w-full flex gap-2 items-center justify-between"
      >
        <button
          type="button"
          onClick={() => setIsUserLists(true)}
          className="text-white bg-primary border-0 py-2 px-8 focus:outline-none hover:bg-[#06d6a0] rounded text-lg"
          disabled={isSending}
        >
          Lists
        </button>
        <div className="relative flex-grow w-full">
          <input
            type="text"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            disabled={isSending} 
          />
        </div>
        <button
          type="submit"
          className="text-white bg-primary border-0 py-2 px-8 focus:outline-none hover:bg-[#06d6a0] rounded text-lg"
          disabled={isSending || !message.trim()}         >
          {isSending ? "Sending..." : "Send"} 
        </button>
      </form>
    </section>
  );
};

export default PrivateSentbox;