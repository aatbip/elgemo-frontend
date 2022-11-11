import React from "react";
import { useSelector } from "react-redux";
import {
  setRoom,
  setNotification,
  resetChat,
  setTotal,
} from "../../redux/socket/socketSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const styles = {
    containerStyle: {
      marginTop: "60px",
    },
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { socket } = useSelector((store) => store.socket);

  /**
   * This hook receives the "notification", "room" and "total" events.
   */
  React.useEffect(() => {
    socket.on("notification", (value) => {
      dispatch(setNotification(value.notice));
    });

    socket.on("room", (value) => {
      dispatch(setRoom(value));
    });

    socket.on("total", (value) => {
      dispatch(setTotal(value));
    });
  }, [socket]);

  /**
   * This function is function that connects to the socket.
   *
   * @param {event} e
   * @returns null
   */

  const connectToSocket = (e) => {
    if (e.key === "Escape" || e.target.type === "button") {
      socket.emit("login", (error) => {
        if (error) {
          console.log("error");
        }
      });

      navigate(`room/${socket.id}`);
    }

    return;
  };

  /**
   * This hook listens to the keydown event for ESC key.
   */
  React.useEffect(() => {
    window.addEventListener("keydown", connectToSocket);

    return () => {
      window.removeEventListener("keydown", connectToSocket);
    };
  }, []);

  /**
   * This hook triggers the resetChat() function that resets the
   * state.
   */
  React.useEffect(() => {
    dispatch(resetChat());
  }, []);

  return (
    <div style={styles.containerStyle} className="container">
      <div className="wrapper font-type-1">
        <h1 style={{ fontSize: "100px" }}>Chat with Stranger</h1>
        <p style={{ fontSize: "30px" }}>Press ESC key to enter...</p>
        <button
          className="enter-button"
          onClick={(e) => connectToSocket(e)}
          type="button"
        >
          ENTER
        </button>
      </div>
    </div>
  );
};

export default Main;
