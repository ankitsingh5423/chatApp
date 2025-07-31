import React, { useEffect, useState } from "react";
import { MoreVertical, Search, SquarePen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  avalableUserListService,
  oneOnOneChatService,
} from "../../services/chatServices";
import {
  clearChatState,
  selectedUser as setSelectedUser,
} from "../../features/chats/chatSlice";
import { logoutService } from "../../services/authServices";
import { ModeToggle } from "./SelectMode";

const ChatSidebar = () => {
  const dispatch = useDispatch();
  const { chatListLoading, chatList, selectedUser } = useSelector(
    (state) => state.chats
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(avalableUserListService());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutService());
    dispatch(clearChatState());
  };

  const handleUserClick = (user) => {
    if (selectedUser?._id === user._id) return; // Don't do anything if already selected
    dispatch(oneOnOneChatService(user._id));
    dispatch(setSelectedUser(user));
  };

  const filteredChatList = chatList?.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const UserListItem = ({ user, isSelected, onClick }) => {
    const fallback = user.username.substring(0, 2).toUpperCase();

    return (
      <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${
          isSelected
            ? "bg-sidebar-foreground text-primary-foreground"
            : "hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${user.username}`}
            alt={user.username}
          />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div className="flex-1 truncate">
          <p className="font-semibold truncate">{user.username}</p>
          <p
            className={`text-sm truncate ${
              isSelected
                ? "text-primary-foreground/80"
                : "text-muted-foreground"
            }`}
          >
            Last message preview...
          </p>
        </div>
      </button>
    );
  };

  const UserSkeleton = () => (
    <div className="flex items-center gap-3 p-2">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );

  return (
    <aside className="w-full md:w-[300px] lg:w-[350px] flex flex-col h-screen bg-background border-r">
      {/* Sidebar Header */}
      <header className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Chats</h1>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <SquarePen className="h-5 w-5" />
              <span className="sr-only">New Chat</span>
            </Button>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                  <span className="sr-only">More Options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>New Group</DropdownMenuItem>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* User List Area */}
      <ScrollArea className="flex-1 h-[calc(100vh-120px)]">
        <div className="p-2 space-y-1">
          {chatListLoading ? (
            Array.from({ length: 8 }).map((_, i) => <UserSkeleton key={i} />)
          ) : filteredChatList && filteredChatList.length > 0 ? (
            filteredChatList.map((user) => {
              return (
                <UserListItem
                  key={user._id}
                  user={user}
                  isSelected={user._id === selectedUser?._id}
                  onClick={() => handleUserClick(user)}
                />
              );
            })
          ) : (
            <div className="text-center text-muted-foreground p-8">
              <p>No chats found.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default ChatSidebar;
