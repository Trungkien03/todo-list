// Define the shape of the Home slice state
interface AddTaskState {
  isLoadingAddTodo: boolean;
  isShowDatePicker: boolean;
}

// Initialize the state
export const initialAddTaskState: AddTaskState = {
  isLoadingAddTodo: false,
  isShowDatePicker: false,
};
