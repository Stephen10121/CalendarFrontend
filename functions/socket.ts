import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useWebsocket(url: string) {
    const [connected, setConnected] = useState(false);
    const [socket, setSocket] = useState<any>(null);
    useEffect(()=>{
        const newSocket = io(url);
        newSocket.on('connect', ()=>setConnected(true));
        newSocket.on('disconnect', ()=>setConnected(false));
        setSocket(newSocket);
    }, [])
    return {
        connected,
        socket,
    }
}