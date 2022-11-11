import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const initialState = {
  socket: io(process.env.REACT_APP_API_URL, {
    transports: ["websocket", "polling"],
  }),
  room: "",
  messages: [],
  notification: "",
  total: "",
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      state.room = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },

    appendMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },

    resetChat: (state, action) => {
      state.room = "";
      state.messages = [];
      state.notification = "";
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { setRoom, setNotification, appendMessage, resetChat, setTotal } =
  socketSlice.actions;

export default socketSlice.reducer;
