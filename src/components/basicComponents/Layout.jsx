import React from 'react'
import ChatSidebar from "../basicComponents/ChatSidebar";
const Layout = () => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      {/* chat-sidebar */}
      <ChatSidebar />
      <div className="bg-yellow-400 lg:col-span-3 md:col-span-2 max-sm:hidden"></div>
    </div>
  );
}

export default Layout
