import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  appendMessage,
  resetChat,
  setNotification,
} from "../../redux/socket/socketSlice";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [message, setMessage] = React.useState("");
  const { socket, notification, room, messages } = useSelector(
    (store) => store.socket
  );

  /**
   * Function to handle textArea input
   *
   */
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  /**
   * This function emits the "sendMessage" socket.
   * It also appends the user message with dispatch(appendMessage).
   */
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", { message, room });
    setMessage("");
    dispatch(appendMessage(`YOU: ${message}`));
  };

  /**
   *This function emits "leaveroom". This function is triggered
     when user leaves the room. All the state are reset using
     resetChat() and navigats to root ("/"). 
   *  
   */
  const leaveChat = (e) => {
    e.preventDefault();
    socket.emit("leaveroom", { room: room });

    dispatch(resetChat());
    navigate("/");
  };

  /**
   * The hook listens to the "message" event coming from the server.
   * It then dispatch(appendMessage) with the incoming message from
   * the server.
   */
  React.useEffect(() => {
    const eventListener = (value) => {
      dispatch(appendMessage(`STRANGER: ${value.message}`));
    };
    socket.on("message", eventListener);

    return () => socket.off("message", eventListener);
  }, [socket]);

  /**
   * This hook listens to the "notification" event and sets the
   * state of notification to the event's value.
   */
  React.useEffect(() => {
    const finalNotification = (value) => {
      dispatch(setNotification(value.notice));
    };
    socket.on("notification", finalNotification);

    return () => socket.off("notification", finalNotification);
  }, [socket]);

  /**
   * This hook triggers resetChat() to reset the state.
   */

  React.useEffect(() => {
    dispatch(resetChat());
  }, []);

  return (
    <div className="container">
      <div className="wrapper">
        {notification && <p className="font-type-1">{notification}</p>}
        <div className="chat-box-wrapper">
          <h2>talking with stranger</h2>
          <hr
            style={{
              display: "block",
              height: "2px",
              border: "0",
              borderTop: "1px solid #232020",
              margin: "8px 0px",
            }}
          />
          {messages &&
            messages.map((el) => {
              return (
                <p
                  style={
                    el.split(":")[0] === "STRANGER" ? { color: "red" } : null
                  }
                  className="msg"
                >
                  {el}
                </p>
              );
            })}
        </div>

        <div className="input-box-wrapper">
          <button onClick={leaveChat} type="button">
            LEAVE
          </button>
          <form onSubmit={sendMessage}>
            <input
              onChange={(e) => handleChange(e)}
              value={message}
              type="text"
            />
            <input
              value="Send"
              type="submit"
              disabled={notification === "Stranger has left" ? true : false}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
