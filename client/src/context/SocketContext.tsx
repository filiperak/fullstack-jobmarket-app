import { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { API_URL } from "../services/API";

interface SocketContextValue{
    socket:any
}
export const SocketContext = createContext<SocketContextValue | undefined>(undefined)

export const SocketContextProvider = ({children}:any) => {
    const socket = io(API_URL)
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}