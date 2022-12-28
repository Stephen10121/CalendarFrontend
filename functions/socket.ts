import { io } from "socket.io-client";
import { SOCKET_SERVER } from "./variables";
//@ts-ignore
const socket = io.connect(SOCKET_SERVER);
export default socket;