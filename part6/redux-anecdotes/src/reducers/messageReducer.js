import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setNotificationMessage(state, action) {
      const message = action.payload;
      return message;
    },
    clearNotification(state, action) {
      return "";
    },
  },
});

export const setNotification = (message, timeOut) => {
  const timeOutInMilliseconds = timeOut * 1000;
  return (dispatch) => {
    dispatch(setNotificationMessage(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeOutInMilliseconds);
  };
};
export const { newAnecdoteMessage, clearNotification, setNotificationMessage } =
  messageSlice.actions;

export default messageSlice.reducer;
