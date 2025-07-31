import React from "react";
import { useSelector } from "react-redux";
import ChatSidebar from "./ChatSidebar";
import ChatArea from "./ChatArea";

const Layout = () => {
  const { selectedUser } = useSelector((state) => state.chats);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <div
        className={`flex-col w-full flex-shrink-0 md:flex md:w-auto ${
          selectedUser ? "hidden" : "flex"
        } `}
      >
        <ChatSidebar />
      </div>
      <main
        className={`flex-1 flex-col md:flex ${
          selectedUser ? "flex" : "hidden"
        }`}
      >
        <ChatArea />
      </main>
    </div>
  );
};

export default Layout;
