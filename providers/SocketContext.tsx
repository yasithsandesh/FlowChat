import { createContext } from "react";
import { Socket } from "socket.io-client";

export type SocketContextType={
    name:string
}

export const SocketContext = createContext<SocketContextType>({name:"n"});