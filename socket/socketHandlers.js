// Map to store user connections: userId -> socketId
const userSocketMap = new Map();

// Function to initialize socket handlers
const initializeSocketHandlers = (io) => {
  io.on("connection", (socket) => {
    const userId = socket.userId;
    
    if (userId) {
      // Store the socket connection for this user
      userSocketMap.set(userId.toString(), socket.id);
      console.log(`User ${userId} connected. Socket ID: ${socket.id}`);
    }

    // Handle disconnect
    socket.on("disconnect", () => {
      if (userId) {
        userSocketMap.delete(userId.toString());
        console.log(`User ${userId} disconnected. Socket ID: ${socket.id}`);
      }
    });
  });
};

// Function to emit notification to a specific user
const emitNotificationToUser = (io, userId, notification) => {
  const socketId = userSocketMap.get(userId.toString());
  
  if (socketId) {
    io.to(socketId).emit("new_notification", {
      notification: notification,
      userId: userId.toString(),
    });
    console.log(`Notification emitted to user ${userId} on socket ${socketId}`);
  } else {
    console.log(`User ${userId} is not connected. Notification will be available on next fetch.`);
  }
};

// Function to check if user is connected
const isUserConnected = (userId) => {
  return userSocketMap.has(userId.toString());
};

module.exports = {
  initializeSocketHandlers,
  emitNotificationToUser,
  isUserConnected,
};

