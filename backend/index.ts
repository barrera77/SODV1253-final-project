import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Vite's default port
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  // Handle joining a room
  socket.on("join room", (room: string) => {
    socket.join(room);
    console.log(`${socket.id} joined room: ${room}`);
  });

  socket.on("chat message", (data: { room: string; message: string }) => {
    const { room, message } = data;
    io.to(room).emit("chat message", message); // Send message to the room
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Socket.IO server is running");
});

httpServer.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});

/* import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Vite's default port
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  // Join a room
  socket.on("join room", (roomName) => {
    socket.join(roomName);
    console.log(`${socket.id} joined room: ${roomName}`);
    // You can broadcast when a user joins the room
    io.to(roomName).emit("chat message", `${socket.id} has joined the room`);
  });

  // Send a message to the specific room
  socket.on("chat message", ({ room, message }) => {
    console.log(`message to room ${room}:`, message);
    io.to(room).emit("chat message", message);
  });

  // Handle user disconnecting
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    // Optionally, broadcast user disconnecting from rooms
    // io.emit("chat message", `${socket.id} has left the chat`);
  });
});

app.get("/", (req, res) => {
  res.send("Socket.IO server is running");
});

httpServer.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
}); */

/* import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Vite's default port
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("chat message", (msg) => {
    console.log("message:", msg);
    io.emit("chat message", msg); // broadcast
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Socket.IO server is running");
});

httpServer.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
 */
