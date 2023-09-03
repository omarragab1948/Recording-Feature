import React from "react";
import ChatsPage from "./chats/ChatsPage";
import ChatPage from "./chat/ChatPage";
const Home = () => {
  return (
    <div className="flex w-full flex-col md:flex-row">
      <ChatsPage />
      <ChatPage />
    </div>
  );
};

export default Home;
