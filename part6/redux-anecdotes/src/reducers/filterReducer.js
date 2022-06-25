import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter(state, action) {
      const content = action.payload;
      return content;
    },
  },
});
export const { changeFilter } = filterSlice.actions;

export default filterSlice.reducer;
