import { createContext, useContext, useState } from "react";

const ChatLogsContext = createContext();

export const ChatLogsProvider = ({ children }) => {
  const [allChatLogs, setAllChatLogs] = useState([
    {
      id: "0c084dcb-3b73-472d-8382-8adc07ea3de3",
      roomName: "open",
      chatLogs: [],
    },
  ]);

  const [user, setUser] = useState({
    avatar: null,
    name: "default",
  });

  const [activeRoom, setActiveRoom] = useState("open");

  function addMessageToDOM(payload) {
    const { room, sender, message, avatar, id } = payload;
    setAllChatLogs((prev) =>
      prev.map((single) => {
        if (room === single.roomName) {
          if (!single.chatLogs.find((item) => item.id === id)) {
            single.chatLogs = [
              ...single.chatLogs,
              { id, sender, message, avatar },
            ];
          }
        }
        return single;
      })
    );
  }

  return (
    <ChatLogsContext.Provider
      value={{
        allChatLogs,
        setAllChatLogs,
        addMessageToDOM,
        user,
        activeRoom,
        setActiveRoom,
      }}
    >
      {children}
    </ChatLogsContext.Provider>
  );
};

export default function useChatLogsContext() {
  return useContext(ChatLogsContext);
}
