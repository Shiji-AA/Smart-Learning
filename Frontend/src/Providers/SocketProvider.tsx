import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";

interface UserData {
  name: string;
  email: string;
  phone: string;
  id: string;
  image: string;
  role: string;
}

const SocketContext = createContext<Socket | undefined>(undefined);

export const useSocket = (): Socket | undefined => {
  const context = useContext(SocketContext);
  return context;
};

interface SocketProviderProps {
  role: "user" | "tutor";
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
  role,
  children,
}) => {
  const [socket, setSocket] = useState<Socket>();
  const user = useSelector((state: any) => {
    if (role === "user") return state?.auth.userdata;
    if (role === "tutor") return state?.tutor.tutordata;
  }) as UserData | undefined;

  useEffect(() => {
    if (!user) return;

    const token =
      role === "user"
        ? localStorage.getItem("studentToken")
        : localStorage.getItem("tutorToken");
    console.log(token, "TOKEN");
    const newSocket = io("http://localhost:3000", {
      query: { role },
      withCredentials: true,
      auth: {
        token: token,
      },
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: Infinity,
      transports: ["websocket"],
    });
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [user, role]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
