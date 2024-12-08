import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "../slices";
import todoListScreenSlice from "@app/features/todoList/slices";
import addTaskScreenSlice from "@app/features/addTodo/slices";

const reducer = {
  dialog: appReducer.dialogSlice,
  todoList: todoListScreenSlice,
  addTask: addTaskScreenSlice,
};

const rootReducer = combineReducers(reducer);
export default rootReducer;
