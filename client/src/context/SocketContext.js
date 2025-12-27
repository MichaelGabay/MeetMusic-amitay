import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import config from "../config/config.json";

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    
    if (!token) {
      // Don't connect if no token
      return;
    }

    // Use the base_url from config, but for socket.io we need the server URL
    // Socket.IO will handle the path automatically
    const socketServerUrl = config.base_url || "http://localhost:8000";

    // Initialize socket connection with authentication
    const socketInstance = io(socketServerUrl, {
      auth: {
        token: token,
      },
      transports: ["polling", "websocket"], // Try polling first, then websocket (more reliable for production)
      upgrade: true,
      rememberUpgrade: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      timeout: 20000,
      forceNew: false,
    });

    // Connection event handlers
    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setIsConnected(false);
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []); // Only run once on mount

  const value = {
    socket,
    isConnected,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketContext;

