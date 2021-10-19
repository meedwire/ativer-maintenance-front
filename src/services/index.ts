import axios from "axios";
import io, { Socket } from "socket.io-client";

const url = __DEV__
  ? "http://127.0.0.1:5000"
  : "https://ativer-back-end.herokuapp.com";

let socket: Socket = io(url, {
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: Infinity,
  transports: ["websocket"],
  autoConnect: true,
  forceNew: true,
  requestTimeout: 1,
});

export function socketConnection() {
  socket = socket?.connected ? socket : socket.connect();

  return socket;
}

//https://ativer-back-end.herokuapp.com

export const api = axios.create({
  baseURL: url,
});
