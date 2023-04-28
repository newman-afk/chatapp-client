import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import useLanguageContext from "../../globalContext/languageContext";
import useChatLogsContext from "../../globalContext/chatLogsContext";
import useSocketContext from "../../globalContext/socketContext";

function JoinRoomModal({ joinRoomModalOpen, setJoinRoomModalOpen }) {
  const { siteContent } = useLanguageContext();
  const { allChatLogs, setAllChatLogs, user, setActiveRoom } =
    useChatLogsContext();
  const { socket } = useSocketContext();
  const inputRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(e) {
    setError(false);
    e.preventDefault();

    const roomName = inputRef.current.value;
    const password = passwordRef.current.value;

    let hasError = false;
    allChatLogs?.forEach((item) => {
      if (item.roomName === roomName) {
        hasError = true;
        setError(true);
        setErrorMessage(siteContent?.duplicateRoomName);
        return;
      }
    });

    if (hasError) return;

    inputRef.current.value = "";
    passwordRef.current.value = "";

    socket?.emit(
      "join_room",
      {
        sender: user.name,
        room: roomName,
        password,
      },
      (res) => {
        if (res.ok) {
          setAllChatLogs((prevAllChatLogs) => [
            ...prevAllChatLogs,
            { id: uuidv4(), roomName, chatLogs: [] },
          ]);

          setActiveRoom(roomName);

          setJoinRoomModalOpen(false);
          setError(false);
          setErrorMessage("");
        } else {
          setError(true);
          setErrorMessage(res.message);
        }
      }
    );
  }

  function closeModal(e) {
    if (e.target === e.currentTarget) {
      setJoinRoomModalOpen(false);
      setError(false);
      setErrorMessage("");
    }
  }

  return createPortal(
    <>
      <label
        htmlFor="join-room-modal"
        className={`modal cursor-pointer ${
          joinRoomModalOpen ? "modal-open" : ""
        }`}
        onClick={closeModal}
      >
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold text-center">
            {siteContent?.joinRoom}
          </h3>

          {error && (
            <div className="alert alert-error shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          <form
            className="py-4 grid place-items-center gap-5"
            onSubmit={handleSubmit}
          >
            <div className="form-control">
              <label className="input-group">
                <span>{siteContent?.roomName}</span>
                <input
                  type="text"
                  className="input input-bordered"
                  required
                  ref={inputRef}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="input-group">
                <span>{siteContent?.roomPassword}</span>
                <input
                  type="password"
                  className="input input-bordered"
                  ref={passwordRef}
                  required
                />
              </label>
            </div>

            <button type="submit" className="btn btn-outline btn-success">
              {siteContent?.confirmButton}
            </button>
          </form>
        </label>
      </label>
    </>,
    document.getElementById("modal")
  );
}

export default JoinRoomModal;
