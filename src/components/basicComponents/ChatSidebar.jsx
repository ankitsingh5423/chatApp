import React, { useState } from "react";
import { PanelTopOpen, SquarePen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { logoutService } from "../../services/authServices";
import { userChatListService } from "../../services/chatServices";

const ChatSidebar = () => {
  const [position, setPosition] = useState("bottom");
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutService());
  };

  const userChatList = () => {
    dispatch(userChatListService());
  };
  userChatList();

  return (
    <div className="bg-black">
      {/* chat-contact header */}
      <div className=" bg-black shadow-lg sticky top-0 flex justify-between px-2 py-3 z-10">
        <h2 className="text-2xl text-white">chats</h2>
        <div className="flex items-center gap-1">
          <div>
            <SquarePen className="cursor-pointer w-10 h-10 p-2 rounded-[10px] hover:bg-neutral-700" />
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <PanelTopOpen className="cursor-pointer w-10 h-10 p-2 rounded-[10px] hover:bg-neutral-700" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  <DropdownMenuRadioItem
                    value="Logout"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">
                    Bottom
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">
                    Right
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* chat contact */}
      <div className="flex flex-col gap-y-1 overflow-y-scroll sticky h-lvh">
        <div
          className="grid grid-cols-5 bg-gradient-to-r from-10% to-80% from-black to-gray-900 shadow-md
        shadow-gray-800 gap-4 items-center justify-center align-middle p-2 hover:bg-gradient-to-r hover:from-10% hover:to-80% hover:from-slate-700 hover:to-neutral-800
        hover:shadow-gray-800 transition-colors duration-400 hover:shadow-lg cursor-pointer"
        >
          <div className="border-2 rounded-[50%] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="user image"
              className="w-full h-full object-cover rounded-[50%] "
            />
          </div>
          <div className="col-span-4 h-full">
            <div>user name</div>
            <div>last message preview</div>
          </div>
        </div>
        <div
          className="grid grid-cols-5 bg-gradient-to-r from-10% to-80% from-black to-gray-900 shadow-md
        shadow-gray-800 gap-4 items-center justify-center align-middle p-2 hover:bg-gradient-to-r hover:from-10% hover:to-80% hover:from-slate-700 hover:to-neutral-800
        hover:shadow-gray-800 transition-colors duration-400 hover:shadow-lg cursor-pointer"
        >
          <div className="border-2 rounded-[50%] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="user image"
              className="w-full h-full object-cover rounded-[50%] "
            />
          </div>
          <div className="col-span-4 h-full">
            <div>ankit name</div>
            <div>last message preview</div>
          </div>
        </div>
        <div
          className="grid grid-cols-5 bg-gradient-to-r from-10% to-80% from-black to-gray-900 shadow-md
        shadow-gray-800 gap-4 items-center justify-center align-middle p-2 hover:bg-gradient-to-r hover:from-10% hover:to-80% hover:from-slate-700 hover:to-neutral-800
        hover:shadow-gray-800 transition-colors duration-400 hover:shadow-lg cursor-pointer"
        >
          <div className="border-2 rounded-[50%] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="user image"
              className="w-full h-full object-cover rounded-[50%] "
            />
          </div>
          <div className="col-span-4 h-full">
            <div>user name</div>
            <div>last message preview</div>
          </div>
        </div>
        <div
          className="grid grid-cols-5 bg-gradient-to-r from-10% to-80% from-black to-gray-900 shadow-md
        shadow-gray-800 gap-4 items-center justify-center align-middle p-2 hover:bg-gradient-to-r hover:from-10% hover:to-80% hover:from-slate-700 hover:to-neutral-800
        hover:shadow-gray-800 transition-colors duration-400 hover:shadow-lg cursor-pointer"
        >
          <div className="border-2 rounded-[50%] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="user image"
              className="w-full h-full object-cover rounded-[50%] "
            />
          </div>
          <div className="col-span-4 h-full">
            <div>user name</div>
            <div>last message preview</div>
          </div>
        </div>
        <div
          className="grid grid-cols-5 bg-gradient-to-r from-10% to-80% from-black to-gray-900 shadow-md
        shadow-gray-800 gap-4 items-center justify-center align-middle p-2 hover:bg-gradient-to-r hover:from-10% hover:to-80% hover:from-slate-700 hover:to-neutral-800
        hover:shadow-gray-800 transition-colors duration-400 hover:shadow-lg cursor-pointer"
        >
          <div className="border-2 rounded-[50%] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="user image"
              className="w-full h-full object-cover rounded-[50%] "
            />
          </div>
          <div className="col-span-4 h-full">
            <div>user name</div>
            <div>last message preview</div>
          </div>
        </div>
        <div
          className="grid grid-cols-5 bg-gradient-to-r from-10% to-80% from-black to-gray-900 shadow-md
        shadow-gray-800 gap-4 items-center justify-center align-middle p-2 hover:bg-gradient-to-r hover:from-10% hover:to-80% hover:from-slate-700 hover:to-neutral-800
        hover:shadow-gray-800 transition-colors duration-400 hover:shadow-lg cursor-pointer"
        >
          <div className="border-2 rounded-[50%] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="user image"
              className="w-full h-full object-cover rounded-[50%] "
            />
          </div>
          <div className="col-span-4 h-full">
            <div>user name</div>
            <div>last message preview</div>
          </div>
        </div>
        <div
          className="grid grid-cols-5 bg-gradient-to-r from-10% to-80% from-black to-gray-900 shadow-md
        shadow-gray-800 gap-4 items-center justify-center align-middle p-2 hover:bg-gradient-to-r hover:from-10% hover:to-80% hover:from-slate-700 hover:to-neutral-800
        hover:shadow-gray-800 transition-colors duration-400 hover:shadow-lg cursor-pointer"
        >
          <div className="border-2 rounded-[50%] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="user image"
              className="w-full h-full object-cover rounded-[50%] "
            />
          </div>
          <div className="col-span-4 h-full">
            <div>user name</div>
            <div>last message preview</div>
          </div>
        </div>
        <div
          className="grid grid-cols-5 bg-gradient-to-r from-10% to-80% from-black to-gray-900 shadow-md
        shadow-gray-800 gap-4 items-center justify-center align-middle p-2 hover:bg-gradient-to-r hover:from-10% hover:to-80% hover:from-slate-700 hover:to-neutral-800
        hover:shadow-gray-800 transition-colors duration-400 hover:shadow-lg cursor-pointer"
        >
          <div className="border-2 rounded-[50%] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="user image"
              className="w-full h-full object-cover rounded-[50%] "
            />
          </div>
          <div className="col-span-4 h-full">
            <div>user name</div>
            <div>last message preview</div>
          </div>
        </div>
        <div
          className="grid grid-cols-5 bg-gradient-to-r from-10% to-80% from-black to-gray-900 shadow-md
        shadow-gray-800 gap-4 items-center justify-center align-middle p-2 hover:bg-gradient-to-r hover:from-10% hover:to-80% hover:from-slate-700 hover:to-neutral-800
        hover:shadow-gray-800 transition-colors duration-400 hover:shadow-lg cursor-pointer"
        >
          <div className="border-2 rounded-[50%] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="user image"
              className="w-full h-full object-cover rounded-[50%] "
            />
          </div>
          <div className="col-span-4 h-full">
            <div>user name</div>
            <div>last message preview</div>
          </div>
        </div>
        <div
          className="grid grid-cols-5 bg-gradient-to-r from-10% to-80% from-black to-gray-900 shadow-md
        shadow-gray-800 gap-4 items-center justify-center align-middle p-2 hover:bg-gradient-to-r hover:from-10% hover:to-80% hover:from-slate-700 hover:to-neutral-800
        hover:shadow-gray-800 transition-colors duration-400 hover:shadow-lg cursor-pointer"
        >
          <div className="border-2 rounded-[50%] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="user image"
              className="w-full h-full object-cover rounded-[50%] "
            />
          </div>
          <div className="col-span-4 h-full">
            <div>user name</div>
            <div>last message preview</div>
          </div>
        </div>
        <div
          className="grid grid-cols-5 bg-gradient-to-r from-10% to-80% from-black to-gray-900 shadow-md
        shadow-gray-800 gap-4 items-center justify-center align-middle p-2 hover:bg-gradient-to-r hover:from-10% hover:to-80% hover:from-slate-700 hover:to-neutral-800
        hover:shadow-gray-800 transition-colors duration-400 hover:shadow-lg cursor-pointer"
        >
          <div className="border-2 rounded-[50%] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="user image"
              className="w-full h-full object-cover rounded-[50%] "
            />
          </div>
          <div className="col-span-4 h-full">
            <div>user name</div>
            <div>last message preview</div>
          </div>
        </div>
        <div
          className="grid grid-cols-5 bg-gradient-to-r from-10% to-80% from-black to-gray-900 shadow-md
        shadow-gray-800 gap-4 items-center justify-center align-middle p-2 hover:bg-gradient-to-r hover:from-10% hover:to-80% hover:from-slate-700 hover:to-neutral-800
        hover:shadow-gray-800 transition-colors duration-400 hover:shadow-lg cursor-pointer"
        >
          <div className="border-2 rounded-[50%] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="user image"
              className="w-full h-full object-cover rounded-[50%] "
            />
          </div>
          <div className="col-span-4 h-full">
            <div>user name</div>
            <div>last message preview</div>
          </div>
        </div>
        <div
          className="grid grid-cols-5 bg-gradient-to-r from-10% to-80% from-black to-gray-900 shadow-md
        shadow-gray-800 gap-4 items-center justify-center align-middle p-2 hover:bg-gradient-to-r hover:from-10% hover:to-80% hover:from-slate-700 hover:to-neutral-800
        hover:shadow-gray-800 transition-colors duration-400 hover:shadow-lg cursor-pointer"
        >
          <div className="border-2 rounded-[50%] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="user image"
              className="w-full h-full object-cover rounded-[50%] "
            />
          </div>
          <div className="col-span-4 h-full">
            <div>user name</div>
            <div>last message preview</div>
          </div>
        </div>
        <div
          className="grid grid-cols-5 bg-gradient-to-r from-10% to-80% from-black to-gray-900 shadow-md
        shadow-gray-800 gap-4 items-center justify-center align-middle p-2 hover:bg-gradient-to-r hover:from-10% hover:to-80% hover:from-slate-700 hover:to-neutral-800
        hover:shadow-gray-800 transition-colors duration-400 hover:shadow-lg cursor-pointer"
        >
          <div className="border-2 rounded-[50%] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="user image"
              className="w-full h-full object-cover rounded-[50%] "
            />
          </div>
          <div className="col-span-4 h-full">
            <div>user name</div>
            <div>last message preview</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
