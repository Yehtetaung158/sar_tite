import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../store/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const SentBox = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const messageSentHandle = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    try {
      const messagePath = collection(db, "messages");
      await addDoc(messagePath, {
        text: message,
        uid: user.uid,
        timestamp: Timestamp.now(),
        username: user.displayName || "Anonymous",
      });
    } catch (e) {
      console.log(e.message);
    } finally {
      setMessage("");
    }
  };

  return (
    <section className=" w-full text-gray-600 body-font bg-gray-300">
      <form
        onSubmit={messageSentHandle}
        className="w-full flex gap-2 items-center justify-between"
      >
        <div className="relative flex-grow w-full">
          <input
            type="text"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button className="text-white bg-gray-700 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          Send
        </button>
      </form>
    </section>
  );
};

export default SentBox;
