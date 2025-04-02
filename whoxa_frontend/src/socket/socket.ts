// @ts-nocheck
import Cookies from "js-cookie";
import { io } from "socket.io-client";

let socket: SocketIOClient;

export const initiateSocketConnection = () => {
  if (!socket) {
    let token = Cookies.get("token");
    socket = io(`${import.meta.env.VITE_SOCKET_URL}?token=${token}`, {
      path: "/socket",
    });
    // socket = io(`http://192.168.0.27:1808`);
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const socketInstance = () => {
  if (!socket) {
    let token = Cookies.get("token");
    socket = io(`${import.meta.env.VITE_SOCKET_URL}?token=${token}`, {
      path: "/socket",
    });
    console.log(socket,"socketfffff");
    
    // socket = io(`http://192.168.0.27:1808`);
  }
  return socket;
};
