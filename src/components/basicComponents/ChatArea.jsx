import React, { useEffect, useState, useRef } from "react";
import { Send, MoreVertical, Phone, Video, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { selectedUser } from "../../features/chats/chatSlice";
import {
  getAllMessagesService,
  oneOnOneChatService,
  sendMessageService,
} from "../../services/chatServices";

const ChatArea = () => {
  const dispatch = useDispatch();
  const scrollAreaRef = useRef(null);

  const {
    loading,
    chatMessages,
    selectedChat,
    selectedUser: currentChatUser,
  } = useSelector((state) => state.chats);
  const { user } = useSelector((state) => state.auth);

  const [message, setMessage] = useState("");

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    if (currentChatUser && selectedChat) {
      dispatch(getAllMessagesService({ chatId: selectedChat }));
    }
  }, [currentChatUser, selectedChat, dispatch]);

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || !currentChatUser) return;

    dispatch(
      sendMessageService({
        chatId: selectedChat,
        message: trimmedMessage,
      })
    );
    // dispatch(oneOnOneChatService(currentChatUser._id));

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!currentChatUser) {
    return (
      <div className="hidden md:flex flex-col items-center justify-center h-full text-center bg-background">
        <h2 className="text-2xl font-semibold">Welcome to Chat</h2>
        <p className="text-muted-foreground mt-2">
          Select a conversation to start messaging.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center gap-2 p-3 border-b">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => dispatch(selectedUser(null))}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <Avatar>
          <AvatarImage
            src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${currentChatUser.username}`}
            alt={currentChatUser.username}
          />
          <AvatarFallback>
            {currentChatUser.username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold truncate">{currentChatUser.username}</p>
          <p className="text-sm text-muted-foreground">Online</p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Contact</DropdownMenuItem>
              <DropdownMenuItem>Clear Chat</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                Block
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <ScrollArea className="flex-1 overflow-auto" ref={scrollAreaRef}>
        <div className="p-4 md:p-6 space-y-4">
          {loading ? (
            <MessageSkeleton />
          ) : chatMessages && chatMessages.length > 0 ? (
            chatMessages.map((msg) => (
              <ChatMessage
                key={msg._id}
                content={msg.content}
                isSender={msg.sender._id === user._id}
              />
            ))
          ) : (
            <div className="text-center text-muted-foreground p-8">
              <p>No messages yet. Start the conversation!</p>
            </div>
          )}
        </div>
      </ScrollArea>

      <footer className="p-3 border-t bg-background">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1"
            autoComplete="off"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="rounded-full flex-shrink-0"
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </footer>
    </div>
  );
};

const ChatMessage = ({ content, isSender }) => (
  <div
    className={`flex items-end gap-2 ${
      isSender ? "justify-end" : "justify-start"
    }`}
  >
    <div
      className={`max-w-xs md:max-w-md lg:max-w-2xl rounded-xl px-4 py-2 ${
        isSender ? "bg-primary text-primary-foreground" : "bg-muted"
      }`}
    >
      <p className="whitespace-pre-wrap">{content}</p>
    </div>
  </div>
);

const MessageSkeleton = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 justify-start">
      <Skeleton className="h-10 w-48 rounded-xl" />
    </div>
    <div className="flex items-center gap-2 justify-end">
      <Skeleton className="h-16 w-64 rounded-xl" />
    </div>
    <div className="flex items-center gap-2 justify-start">
      <Skeleton className="h-10 w-32 rounded-xl" />
    </div>
    <div className="flex items-center gap-2 justify-end">
      <Skeleton className="h-10 w-48 rounded-xl" />
    </div>
  </div>
);

export default ChatArea;
