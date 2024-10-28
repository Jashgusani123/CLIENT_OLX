import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Notifications, NotificationImportant } from "@mui/icons-material";
import Navbar from "./Navbar";
import { useAuth } from "../../Context/AllContext";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  // Ensure user is defined and userId is available
  const userId = user?._id;

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userId) return; // Exit early if userId is not available

      try {
        const response = await fetch(`http://localhost:5000/api/v1/notifications/${userId}`);
        
        // Check if response is ok
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Ensure data is an array
        if (Array.isArray(data)) {
          setNotifications(data); // Set notifications if they exist
        } else {
          console.error("Notifications data is not an array:", data);
          setNotifications([]); // Set to empty array if notifications are not valid
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);
  
  const handleClickNotification = (Id)=>{
    setTimeout(async()=>{
      const response = await fetch(`http://localhost:5000/api/v1/notifications/delete`,{
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({Id}),
        credentials: "include", // Include cookies
      });
        
        // Check if response is ok
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
    },3000)
    navigate("/chat")

  }
  
  return (
    <>
      <Navbar />
      <Box sx={{ padding: 2, height: "87vh", overflowY: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Notifications
        </Typography>
        {notifications.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 10 }}>
            <NotificationImportant sx={{ fontSize: 60, color: "gray" }} />
            <Typography variant="body1">No Notifications Coming</Typography>
          </Box>
        ) : (
          <List>
            {notifications.map((notification) => (
              <ListItem key={notification._id} divider>
                <ListItemAvatar>
                  <Avatar 
                    src={notification.senderAvatar} // Adjust the URL based on your backend structure
                    alt={notification.senderId._id} // You may want to provide a proper name or fallback here
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={notification.senderName} // Replace with sender's name if available
                  secondary={
                    notification.message.length > 50
                      ? `${notification.message.substring(0, 50)}...` // Trim message if too long
                      : notification.message
                  }
                />
                <IconButton edge="end" onClick={()=>handleClickNotification(notification._id)}>
                  <Notifications color={notification.isRead ? "disabled" : "primary"} />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </>
  );
};

export default NotificationPage;
