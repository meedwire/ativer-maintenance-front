import axios from 'axios';
import io, {Socket} from 'socket.io-client';

let socket: Socket = io('https://ativer-back-end.herokuapp.com', {
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: Infinity,
  transports: ['websocket'],
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
  baseURL: 'https://ativer-back-end.herokuapp.com',
});

