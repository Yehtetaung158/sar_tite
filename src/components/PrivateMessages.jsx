import { useEffect, useRef } from "react";
import useUserHook from "../Hooks/useUserHook";
import useGetDoc from "../Hooks/useGetDoc";

const PrivateMessages = ({ currentUid }) => {
  const messagesEndRef = useRef(null);
  const { currentUser } = useUserHook();
  const collectionPath = `chatRooms/${currentUid}/messages`;
  const { messages = [], isError, isLoading } = useGetDoc(collectionPath);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp?.toDate) return "No timestamp available";
    const date = new Date(timestamp.toDate());
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex-grow overflow-y-auto px-4 mb-10">
      <ul className="space-y-3">
        {messages.length === 0 ? (
          <li className="w-full mx-auto text-center h-full p-[100px] dark:text-white">
            You can send a message
          </li>
        ) : (
          messages.map((message, index) => {
            const isCurrentUser = message.uid === currentUser?.uid;
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
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-darkText1 text-gray-800"
                  }`}
                >
                  {!isCurrentUser && (
                    <span className="block font-semibold mb-1">
                      {message.username}
                    </span>
                  )}
                  <span className="block">{message.text}</span>
                  <span
                    className={`text-xs mt-1 ${
                      isCurrentUser ? "text-gray-200" : "text-gray-500"
                    } block text-right`}
                  >
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
              </li>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </ul>
    </div>
  );
};

export default PrivateMessages;
