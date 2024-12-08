import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "../slices";
import todoListScreenSlice from "@app/features/todoList/slices";

const reducer = {
  dialog: appReducer.dialogSlice,
  todoList: todoListScreenSlice,
};

const rootReducer = combineReducers(reducer);
export default rootReducer;
