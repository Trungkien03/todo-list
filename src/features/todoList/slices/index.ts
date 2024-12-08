import { Priority, Todo } from "@app/types/todo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialTodoListScreenState } from "./types";

const todoListScreenSlice = createSlice({
  name: "todoList",
  initialState: initialTodoListScreenState,
  reducers: {
    resetMainState: () => initialTodoListScreenState,
    addTodo: (
      state,
      action: PayloadAction<{
        title: string;
        description?: string;
        dueDate: Date | undefined;
        priority: Priority;
      }>,
    ) => {
      const newTodo: Todo = {
        id: Math.random().toString(),
        title: action.payload.title,
        dueDate: action.payload.dueDate,
        priority: action.payload.priority,
        completed: false,
      };
      state.todos.push(newTodo);
    },

    // Edit an existing todo
    editTodo: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        dueDate: Date | undefined;
        priority: Priority;
        completed: boolean;
      }>,
    ) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id,
      );
      if (index !== -1) {
        state.todos[index].title = action.payload.title;
        state.todos[index].dueDate = action.payload.dueDate;
        state.todos[index].priority = action.payload.priority;
        state.todos[index].completed = action.payload.completed;
      }
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },

    setIsLoadingGetTodo: (state, action: PayloadAction<boolean>) => {
      state.isLoadingGetTodo = action.payload;
    },

    toggleComplete: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const {
  resetMainState,
  addTodo,
  editTodo,
  deleteTodo,
  toggleComplete,
  setTodos,
  setIsLoadingGetTodo,
} = todoListScreenSlice.actions;

export default todoListScreenSlice.reducer;
