import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useChatLogsContext from "./chatLogsContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const { addMessageToDOM } = useChatLogsContext();

  useEffect(() => {
    setSocket(io("http://localhost:3000"));
  }, []);

  useEffect(() => {
    socket?.on("receive_message", (payload) => {
      addMessageToDOM(payload);
    });

    return () =>
      socket?.off("receive_message", (payload) => {
        addMessageToDOM(payload);
      });
  }, [socket]);

  function sendMessage(payload) {
    addMessageToDOM({ ...payload, sender: "me" });
    socket.emit("send_message", payload);
  }

  return (
    <SocketContext.Provider value={{ sendMessage, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default function useSocketContext() {
  return useContext(SocketContext);
}
