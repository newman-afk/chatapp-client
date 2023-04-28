import { useEffect, useInsertionEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Navbar, SwitchLanguageButton, ThemeSelect } from "../components";
import {
  Avatar_Avacado_Food,
  Avatar_Bot,
  Avatar_Default,
} from "../assets/images";
import { CreateRoomModal, JoinRoomModal } from "../components/Modals";
import useLanguageContext from "../globalContext/languageContext";
import useChatLogsContext from "../globalContext/chatLogsContext";
import useSocketContext from "../globalContext/socketContext";

function HomePage() {
  const inputRef = useRef();
  const { siteContent } = useLanguageContext();
  const { allChatLogs, user, activeRoom, setActiveRoom } = useChatLogsContext();
  const { sendMessage } = useSocketContext();
  const chatBottomRef = useRef();

  const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false);
  const [joinRoomModalOpen, setJoinRoomModalOpen] = useState(false);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allChatLogs]);
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex justify-between items-center mx-4 md:ml-20">
          <div className="tabs">
            <label
              htmlFor="create-room-modal"
              className="tab tab-lg tab-lifted"
              onClick={() => setCreateRoomModalOpen(true)}
            >
              {siteContent?.createRoom}
            </label>
            <label
              htmlFor="join-room-modal"
              className="tab tab-lg tab-lifted"
              onClick={() => setJoinRoomModalOpen(true)}
            >
              {siteContent?.joinRoom}
            </label>
          </div>
          <div>
            <SwitchLanguageButton />
            <ThemeSelect />
          </div>
        </div>

        <div className="card flex-1 bg-base-100 shadow-xl md:m-16">
          <div className="card-body md:flex-row gap-4">
            <ul className="menu bg-base-100 w-56 max-h-96 overflow-y-auto flex-nowrap">
              <li className="menu-title">
                <span>{siteContent?.room}</span>
              </li>

              {allChatLogs?.map(({ roomName, id }) => {
                return (
                  <li
                    className={`${activeRoom === roomName ? "bordered" : ""}`}
                    key={id}
                    onClick={() => setActiveRoom(roomName)}
                  >
                    <a>
                      {roomName === "open" ? siteContent?.openRoom : roomName}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-col flex-1">
              <div className="flex flex-col h-96 overflow-y-scroll">
                {allChatLogs
                  .find((singleRoom) => singleRoom.roomName === activeRoom)
                  .chatLogs.map(({ avatar, sender, message, id }) => (
                    <div
                      className={`chat ${
                        sender === "me" ? "chat-end" : "chat-start"
                      } first-of-type:mt-auto`}
                      key={id}
                    >
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img
                            src={`${
                              avatar !== null
                                ? avatar
                                : sender === "bot"
                                ? Avatar_Bot
                                : sender === "me"
                                ? Avatar_Avacado_Food
                                : Avatar_Default
                            } 
                          `}
                          />
                        </div>
                      </div>
                      <div className="chat-bubble">{message}</div>
                    </div>
                  ))}
                <div ref={chatBottomRef}></div>
              </div>

              <div className="flex w-full gap-4 mt-4">
                <input
                  type="text"
                  ref={inputRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage({
                        id: uuidv4(),
                        avatar: user.avatar,
                        sender: user.name,
                        message: inputRef.current.value,
                        room: activeRoom,
                      });
                      inputRef.current.value = "";
                    }
                  }}
                  placeholder={siteContent?.inputPlaceholder}
                  className="input input-bordered input-primary flex-1"
                />
                <button
                  className="btn btn-primary md:px-10"
                  onClick={() => {
                    sendMessage({
                      id: uuidv4(),
                      avatar: user.avatar,
                      sender: user.name,
                      message: inputRef.current.value,
                      room: activeRoom,
                    });
                    inputRef.current.value = "";
                  }}
                >
                  {siteContent?.confirmButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateRoomModal
        createRoomModalOpen={createRoomModalOpen}
        setCreateRoomModalOpen={setCreateRoomModalOpen}
      />
      <JoinRoomModal
        joinRoomModalOpen={joinRoomModalOpen}
        setJoinRoomModalOpen={setJoinRoomModalOpen}
      />
    </>
  );
}

export default HomePage;
