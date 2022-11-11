import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "../redux/socket/socketSlice";

const store = configureStore({
  reducer: {
    socket: socketReducer,
  },
});

export default store;
