import { io } from "socket.io-client";
import { SOCKET_SERVER } from "./variables";
const socket = io(SOCKET_SERVER);
export default socket;