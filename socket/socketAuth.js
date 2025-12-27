const jwt = require("jsonwebtoken");

const socketAuth = (socket, next) => {
  try {
    // Get token from handshake auth or query
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    
    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedUser) => {
      if (err) {
        // If access token expired, try refresh token
        // Note: Socket.IO can't access cookies easily, so we'll rely on access token
        // or pass refresh token in auth if needed
        return next(new Error("Authentication error: Invalid or expired token"));
      }
      
      // Attach user info to socket for later use
      socket.userId = decodedUser._id;
      socket.userEmail = decodedUser.email;
      next();
    });
  } catch (error) {
    next(new Error("Authentication error: " + error.message));
  }
};

module.exports = socketAuth;

