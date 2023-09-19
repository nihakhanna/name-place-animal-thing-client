// Shared web socket
import io from "socket.io-client";

// const ENDPOINT = 'http://localhost:5000/'
const ENDPOINT = "name-place-animal-thing-server.vercel.app";
const socket = io(ENDPOINT);

export { socket };
