import { createSlice } from "@reduxjs/toolkit";
import { initialAddTaskState } from "./types";

const addTaskScreenSlice = createSlice({
  name: "addTask",
  initialState: initialAddTaskState,
  reducers: {
    resetAddTaskScreenState: () => initialAddTaskState,
    setIsLoadingAddTodo: (state, action) => {
      state.isLoadingAddTodo = action.payload;
    },
    setIsShowDatePicker: (state, action) => {
      state.isShowDatePicker = action.payload;
    },
  },
});

export const {
  resetAddTaskScreenState,
  setIsLoadingAddTodo,
  setIsShowDatePicker,
} = addTaskScreenSlice.actions;

export default addTaskScreenSlice.reducer;
