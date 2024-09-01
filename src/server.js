const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./utils/db');
const config = require('./config/db.config');
const authRoutes = require('./routes/auth.routes');
const shiftRoutes = require('./routes/shift.routes');
const userRoutes = require('./routes/user.routes');
const chatRoutes = require('./routes/chat.routes');
const errorMiddleware = require('./middleware/errorHandlar');
const Chat = require('./models/chat.model');
const User = require('./models/user.model');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Database Connection
connectDB();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // React frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // HTTP methods to allow
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers to allow
};

app.use(cors(corsOptions)); // Use CORS middleware with options

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/shifts', shiftRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

// WebSocket connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', async (data) => {
    try {
      const user = await User.findById(data.userId);
      if (!user) {
        socket.emit('error', 'User not found');
        return;
      }

      const chatMessage = new Chat({
        sender: data.userId,
        message: data.message,
        role: user.role
      });

      await chatMessage.save();

      io.emit('receiveMessage', {
        sender: user.name,
        role: user.role,
        message: chatMessage.message,
        timestamp: chatMessage.timestamp
      });
    } catch (error) {
      socket.emit('error', 'Server error');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Server
const PORT = config.port;
server.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

module.exports = app;
