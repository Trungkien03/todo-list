import { Todo } from "@app/types/todo";

// Define the shape of the Home slice state
interface TodoListScreenState {
  isLoadingGetTodo: boolean;
  todos: Todo[];
}

// Initialize the state
export const initialTodoListScreenState: TodoListScreenState = {
  isLoadingGetTodo: false,
  todos: [],
};
