// Shared web socket
import io from "socket.io-client";

// const ENDPOINT = 'http://localhost:5000/'
const ENDPOINT =
  "https://name-place-animal-thing-server-rh4o6cc4z-nihakhanna.vercel.app/";
const socket = io(ENDPOINT);

export { socket };
