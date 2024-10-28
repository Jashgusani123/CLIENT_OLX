import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  AppBar,
  Toolbar,
  Avatar,
  Badge,
} from "@mui/material";
import { Chat, Send } from "@mui/icons-material";
import { io } from "socket.io-client";
import Navbar from "./Navbar";
import { useAuth } from "../../Context/AllContext";
import "../../index.css";

const ChatPage = () => {
  const {
    GetAllChatsOfUser,
    UserChats = [],
    user,
    GetAllMessage,
    SendMessage,
  } = useAuth();
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const currentUserId = user._id;

  // Initialize Socket.IO client
  const socket = React.useRef();

  useEffect(() => {
    socket.current = io("https://server-olx.vercel.app/"); // Update with your backend URL
    socket.current.on("connect", () => {
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  // Fetch chats on mount
  useEffect(() => {
    const fetchChats = async () => {
      try {
        await GetAllChatsOfUser();
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  // Fetch messages when a chat is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChatId) {
        const messagesOfUser = await GetAllMessage(selectedChatId);
        setMessages(messagesOfUser);

        // Join the chat room
        socket.current.emit("joinChat", selectedChatId);
      }
    };
    fetchMessages();
  }, [selectedChatId]);

  // Listen for new messages from the server
  useEffect(() => {
    socket.current.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.current.off("newMessage");
    };
  }, []);

  const handleChatSelect = (id) => {
    setSelectedChatId(id);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      content: newMessage,
      chatId: selectedChatId,
      senderId: {
        _id: currentUserId, // Wrap the senderId as an object
      },
      timestamp: new Date().toISOString(), // Include a timestamp if needed
    };

    try {
      // Send the message via API
      await SendMessage(messageData);

      // Emit the message via Socket.IO, but don't add it to `messages` locally
      socket.current.emit("sendMessage", messageData);

      setNewMessage(""); // Clear the input
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const selectedChat = UserChats.find((chat) => chat._id === selectedChatId);
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", height: "80vh", overflow: "hidden" }}>
        {/* Left Side - Chat List */}
        <Box
          sx={{
            width: "300px",
            borderRight: "1px solid #ccc",
            padding: 2,
            overflowY: "auto",
            height: "80vh",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Chats
          </Typography>
          {loading ? (
            <Typography variant="body1">Loading chats...</Typography>
          ) : Array.isArray(UserChats) && UserChats.length === 0 ? (
            <Box sx={{ textAlign: "center", mt: 10 }}>
              <Chat sx={{ fontSize: 60, color: "gray" }} />
              <Typography variant="body1">No Chats Available</Typography>
            </Box>
          ) : (
            <List>
              {UserChats.map((chat) => {
                const isUser1 = chat.user1._id === currentUserId;
                const otherUser = isUser1 ? chat.user2 : chat.user1;

                return (
                  <div
                    key={chat._id}
                    onClick={() => handleChatSelect(chat._id)}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px",
                      position: "relative",
                    }}
                  >
                    <Avatar src={otherUser.Avatar} />
                    <ListItem component="div" sx={{ flexGrow: 1 }}>
                      <ListItemText primary={otherUser.Name} />
                    </ListItem>
                    {unreadCounts[chat._id] > 0 && (
                      <Badge
                        badgeContent={unreadCounts[chat._id]}
                        color="primary"
                        sx={{
                          backgroundColor: "blue",
                          color: "white",
                          position: "absolute",
                          right: 0,
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </List>
          )}
        </Box>

        {/* Right Side - Chat Window */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: 2,
            bgcolor: "#f0f0f0",
            height: "80vh",
          }}
        >
          {selectedChat ? (
            <>
              <AppBar position="static">
                <Toolbar
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "20%",
                    fontFamily: "monospace",
                  }}
                >
                  <Avatar
                    src={
                      selectedChat.user1._id === currentUserId
                        ? selectedChat.user2.Avatar
                        : selectedChat.user1.Avatar
                    }
                  />
                  <Typography variant="h6">
                    {selectedChat.user1._id === currentUserId
                      ? selectedChat.user2.Name
                      : selectedChat.user1.Name}
                  </Typography>
                </Toolbar>
              </AppBar>

              {/* Message list with scroll */}
              <Box
                className="scrollbar" // This applies the custom scrollbar styling
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  padding: 2,
                  height: "100%",
                }}
              >
                {messages.length > 0 ? (
                  messages.map((msg) => {
                    const isOwnMessage = msg.senderId._id === currentUserId; // Access _id from senderId object

                    return (
                      <Box
                        key={msg._id}
                        sx={{
                          display: "flex",
                          justifyContent: isOwnMessage
                            ? "flex-end"
                            : "flex-start",
                          mb: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            maxWidth: "70%",
                            p: 1,
                            borderRadius: 50,
                            color: isOwnMessage ? "white" : "black",
                            bgcolor: isOwnMessage ? "blue" : "lightgray",
                            alignSelf: isOwnMessage ? "flex-end" : "flex-start",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {msg.content}
                        </Typography>
                      </Box>
                    );
                  })
                ) : (
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{ textAlign: "center" }}
                  >
                    No messages yet. Start the conversation!
                  </Typography>
                )}
              </Box>

              {/* Message input field */}
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <IconButton
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send />
                </IconButton>
              </Box>
            </>
          ) : (
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              Select a chat to start messaging!
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ChatPage;
