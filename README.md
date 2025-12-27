# 🎵 MeetMusic

> An online social network for musicians to connect with each other, share content, connect with people with similar interests, and more.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen.svg)](https://www.mongodb.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8-black.svg)](https://socket.io/)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- 🔐 **User Authentication** - Secure registration and login with JWT tokens
- 📝 **Post Management** - Create, share, and manage posts with image uploads
- 💬 **Comments System** - Comment on posts with nested reply support
- ❤️ **Likes & Interactions** - Like posts and engage with content
- 👥 **Social Features** - Follow/unfollow musicians, view followers and following
- 🔔 **Real-time Notifications** - Get instant notifications via WebSocket (Socket.IO)
- 👤 **User Profiles** - Customizable profiles with user information
- 🔍 **People Discovery** - "People You May Know" feature to find similar musicians
- 📱 **Real-time Updates** - Live updates for posts, comments, and notifications
- 🎨 **Modern UI** - Beautiful interface built with Material-UI

## 🛠 Tech Stack

### Frontend

- **React** 18.2 - UI library
- **Material-UI (MUI)** - Component library
- **React Router** 6.4 - Routing
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Socket.IO** - WebSocket library
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Cloudinary** - Image storage and management

### DevOps

- **dotenv** - Environment variables
- **CORS** - Cross-origin resource sharing
- **Render.com** - Deployment platform

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or cloud instance)
- [Cloudinary](https://cloudinary.com/) account (for image uploads)

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ilorwork/MeetMusic.git
   cd MeetMusic-amitay
   ```

2. **Install backend dependencies**

   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

## ⚙️ Configuration

1. **Create a `.env` file in the root directory:**

   ```env
   # Server Configuration
   PORT=8000
   NODE_ENV=development

   # MongoDB
   MONGO_URI=your_mongodb_connection_string

   # JWT Secrets
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # CORS Configuration
   ALLOWED_ORIGINS=http://localhost:3000
   ```

2. **Update the MongoDB connection string** in `.env` with your MongoDB URI.

3. **Set up Cloudinary** and add your credentials to `.env`.

## 🎯 Usage

### Development Mode

Run both frontend and backend concurrently:

```bash
npm run dev
```

This will start:

- Backend server on `http://localhost:8000`
- Frontend development server on `http://localhost:3000`

### Production Mode

1. **Build the frontend:**

   ```bash
   cd client
   npm run build
   cd ..
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:8000`

## 📁 Project Structure

```
MeetMusic-amitay/
├── client/                 # React frontend application
│   ├── public/            # Public assets
│   └── src/
│       ├── components/    # React components
│       ├── routes/        # Route definitions
│       ├── context/       # React contexts
│       ├── helpers/       # Helper functions
│       └── config/        # Configuration files
├── controllers/           # Request handlers
├── models/               # MongoDB models
├── routes/               # API routes
├── middleware/           # Express middleware
├── socket/               # Socket.IO handlers
├── helpers/              # Utility functions
├── utils/                # Utility modules
├── server.js             # Express server entry point
└── package.json          # Backend dependencies
```

## 🔌 API Endpoints

### Users

- `POST /users/register` - Register a new user
- `POST /users/login` - User login
- `GET /users/current` - Get current user info
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `GET /users/people-you-may-know` - Get suggested connections

### Posts

- `GET /posts/home` - Get home feed posts
- `POST /posts` - Create a new post
- `GET /posts/:id` - Get post by ID
- `DELETE /posts/:id` - Delete a post

### Comments

- `POST /comments` - Create a comment
- `GET /comments/post/:postId` - Get comments for a post
- `POST /comments-to-comments` - Reply to a comment

### Likes

- `POST /likes` - Like/unlike a post

### Notifications

- `GET /notifications` - Get user notifications
- `PUT /notifications/:id/read` - Mark notification as read

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**MeetMusic Team**

- GitHub: [@ilorwork](https://github.com/ilorwork)
- Project Link: [https://github.com/ilorwork/MeetMusic](https://github.com/ilorwork/MeetMusic)

## 🌟 Acknowledgments

- Material-UI for the amazing component library
- Socket.IO for real-time functionality
- Cloudinary for image management
- All the musicians and developers who make this community great! 🎸🎹🎤

---

Made with ❤️ for the music community
