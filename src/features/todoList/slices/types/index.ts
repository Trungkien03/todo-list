import { Todo } from "@app/types/todo";

// Define the shape of the Home slice state
interface MainState {
  isLoadingGetTodo: boolean;
  todos: Todo[];
}

// Initialize the state
export const initialMainState: MainState = {
  isLoadingGetTodo: false,
  todos: [],
};
