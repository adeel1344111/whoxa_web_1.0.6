const io = require("socket.io-client");

// Replace with your actual Socket.io server URL
const SOCKET_URL = "http://192.168.0.27:1808";
const socket = io(SOCKET_URL);

socket.on("connect", () => {
  console.log("Connected to Socket.io server", socket.id);

  // Send a message to the server
  socket.emit("message", "Hello from Server 2!");
});

socket.on("response", (data) => {
  console.log("Received from server:", data);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

module.exports = socket;
