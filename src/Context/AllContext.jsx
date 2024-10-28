import { createContext, useContext, useEffect, useState } from "react";
import Notifications from "../Components/Layout/Notifications"; // Update import to match your Notification component
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [Favorite, setFavorite] = useState([]);
  const [UserChats, setUserChats] = useState([])

  const signupUser = async (credentials) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/makeuser`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
          credentials: "include", // Include cookies
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setNotification({ message: data.message, type: "success" });
        navigate("/login");
      } else {
        setNotification({
          message: data.message || "An error occurred",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        message: "An error occurred while signing up.",
        type: "error",
      });
    }
  };

  const loginUser = async (credentials) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/accessuser`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
          credentials: "include", // Include cookies
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setNotification({ message: data.message, type: "success" });
        navigate("/");
      } else {
        setNotification({
          message: data.message || "An error occurred",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        message: "An error occurred while signing up.",
        type: "error",
      });
    }
  };

  const GetUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/getdetails`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Include cookies
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setNotification({ message: data.message, type: "success" });
      } else {
        setNotification({
          message: data.message || "An error occurred",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        message: "An error occurred while signing up.",
        type: "error",
      });
    }
  };

  const UpdateDetail = async (credentials) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/update`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
          credentials: "include", // Include cookies
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setNotification({ message: data.message, type: "success" });
        navigate("/");
      } else {
        setNotification({
          message: data.message || "An error occurred",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "An error occurred while signing up.",
        type: "error",
      });
    }
  };

  const LogoutUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/logout`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Include cookies
        }
      );

      const data = await response.json();

      if (response.ok) {
        setNotification({ message: data.message, type: "success" });
        navigate("/login");
      } else {
        setNotification({
          message: data.message || "An error occurred",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "An error occurred while signing up.",
        type: "error",
      });
    }
  };

  const AddFavorite = async (credentials) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/favorite/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
          credentials: "include", // Include cookies
        }
      );

      const data = await response.json();

      if (response.ok) {
        setNotification({ message: data.message, type: "success" });
      } else {
        setNotification({
          message: data.message || "An error occurred",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "An error occurred while signing up.",
        type: "error",
      });
    }
  };

  const DeleteFavoriteItem = async (credentials) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/favorite/removeitem`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
          credentials: "include", // Include cookies
        }
      );

      const data = await response.json();

      if (response.ok) {
        setNotification({ message: data.message, type: "success" });
      } else {
        setNotification({
          message: data.message || "An error occurred",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "An error occurred while signing up.",
        type: "error",
      });
    }
  };

  const GetFavoriteItem = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/favorite/getfavorite`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Include cookies
        }
      );

      const data = await response.json();

      if (response.ok) {
        setFavorite(data.favorite);
      } else {
        setNotification({
          message: data.message || "An error occurred",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "An error occurred while signing up.",
        type: "error",
      });
    }
  };

  const ViewItemDetails = async (credentials) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/favorite/viewdetails`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body:JSON.stringify(credentials),
          credentials: "include", // Include cookies
        }
      );

      const data = await response.json();

      if (response.ok) {
        return data.data
      } else {
        setNotification({
          message: data.message || "An error occurred",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "An error occurred while signing up.",
        type: "error",
      });
    }
  };
  const GetCards = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/card/getcards`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Include cookies
        }
      );

      const data = await response.json();

      if (response.ok) {
        return data.data
      } else {
        setNotification({
          message: data.message || "An error occurred",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "An error occurred while signing up.",
        type: "error",
      });
    }
  };
  const startchat = async (credentials) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/chat/startchat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body:JSON.stringify(credentials),
          credentials: "include", // Include cookies
        }
      );

      const data = await response.json();

      if (response.ok) {
        setNotification({message:data.message , type:"success"})
      } else {
        setNotification({
          message: data.message || "An error occurred",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "An error occurred while signing up.",
        type: "error",
      });
    }
  };
  const GetAllChatsOfUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/chat/getallchats`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Include cookies
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUserChats(data.chats)
      } else {
        setNotification({
          message: data.message || "An error occurred",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "An error occurred while signing up.",
        type: "error",
      });
    }
  };
  const GetAllMessage = async (chatId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/messages/${chatId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Include cookies
        }
      );

      const data = await response.json();

      if (response.ok) {
       return data.messages
      } else {
        setNotification({
          message: data.message || "An error occurred",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "An error occurred while signing up.",
        type: "error",
      });
    }
  };

  const SendMessage = async (credentials) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/messages/send`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body:JSON.stringify(credentials),
          credentials: "include", // Include cookies
        }
      );

      const data = await response.json();

      if (response.ok) {
        return data.data
      } else {
        setNotification({
          message: data.message || "An error occurred",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "An error occurred while signing up.",
        type: "error",
      });
    }
  };
  
  const closeNotification = () => {
    setNotification({ message: "", type: "" });
  };

  // Automatically close notification after 3 seconds
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        closeNotification();
      }, 3000);
      return () => clearTimeout(timer); // Clear timeout on cleanup
    }
  }, [notification]);

  const value = {
    user,
    setUser,
    Favorite,
    UserChats,
    signupUser,
    loginUser,
    GetUser,
    UpdateDetail,
    LogoutUser,
    AddFavorite,
    DeleteFavoriteItem,
    GetFavoriteItem,
    ViewItemDetails,
    GetCards,
    startchat,
    GetAllChatsOfUser,
    GetAllMessage,
    SendMessage,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {notification.message && (
        <Notifications
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
