import React from "react";
import SentBox from "./SentBox";
import MessageList from "./MessageList";

const ChatRoom = () => {
  return (
    <div className=" w-full relative">
        <MessageList />
        <div className=" w-full fixed bottom-0 left-0 right-0"><SentBox /></div>
    </div>
  );
};

export default ChatRoom;