// Shared web socket
import io from 'socket.io-client'

const ENDPOINT = 'http://localhost:5000/'
const socket = io(ENDPOINT);

export { socket }