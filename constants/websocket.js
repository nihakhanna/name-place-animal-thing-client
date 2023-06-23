// Shared web socket
import io from "socket.io-client";

// const ENDPOINT = 'http://localhost:5000/'
const ENDPOINT = "https://web-production-a3bc.up.railway.app/";
const socket = io(ENDPOINT);

export { socket };
