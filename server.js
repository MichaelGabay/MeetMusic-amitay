const express = require("express");
const cors = require("cors");
const { routesInit } = require("./routes/baseRouts");
require("dotenv").config();
require("./mongoConnect");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const socketAuth = require("./socket/socketAuth");
const { initializeSocketHandlers } = require("./socket/socketHandlers");

const app = express();

app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
// Allows the app to get a json format
app.use(express.json());
app.use(cookieParser());

// Configure allowed origins for CORS (development and production)
const isDevelopment = process.env.NODE_ENV !== "production";
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : isDevelopment
  ? [
      "http://localhost:3000",
      "http://localhost:3000/",
    ]
  : [
      "https://meetmusic.onrender.com",
      "https://meetmusic.onrender.com/",
    ];

// Update CORS configuration to include production origins
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        // Also allow any origin from the same domain (for Render.com subdomains)
        const originDomain = new URL(origin).hostname;
        if (
          (!isDevelopment && originDomain.includes("meetmusic.onrender.com")) ||
          (isDevelopment && originDomain.includes("localhost"))
        ) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      }
    },
    credentials: true,
  })
);
app.use(express.static("client/build"));

routesInit(app);

const port = process.env.PORT || 8000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration
// Socket.IO CORS works better with an array or true for same-origin
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["authorization", "content-type"],
  },
  allowEIO3: true, // Allow Engine.IO v3 clients
});

// Apply authentication middleware
io.use(socketAuth);

// Initialize socket handlers
initializeSocketHandlers(io);

// Make io accessible to other modules
app.set("io", io);

server.listen(port, () => {
  console.log(`Server is listening in port ${port}`);
});
