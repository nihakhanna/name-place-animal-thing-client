// Shared web socket
import io from 'socket.io-client'

const ENDPOINT = 'http://localhost:5000/'
// const ENDPOINT = 'https://name-place-animal-thing.herokuapp.com'
const socket = io(ENDPOINT);

export { socket }