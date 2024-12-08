import { useAppDispatch, useAppSelector } from "@app/stores";
import { hideDialog, showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import {
  createTable,
  deleteTodoSqlite,
  getDBConnection,
  getTodosSqlite,
  updateTodoSqlite,
} from "@app/utils/SQLiteHelper";
import { useEffect, useCallback } from "react";
import { Todo } from "@app/types/todo";
import {
  deleteTodo,
  setIsLoadingGetTodo,
  setTodos,
  toggleComplete,
} from "../slices";

const useMainViewModel = () => {
  const { todos } = useAppSelector((state) => state.todoList);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const initDB = async () => {
      try {
        dispatch(setIsLoadingGetTodo(true));
        const db = await getDBConnection();
        await createTable(db);
        await fetchTodos();
      } catch (error: any) {
        handleError(error.message);
      } finally {
        dispatch(setIsLoadingGetTodo(false));
      }
    };
    initDB();
  }, []);

  const fetchTodos = useCallback(async () => {
    try {
      const db = await getDBConnection();
      const allTodos = await getTodosSqlite(db);
      dispatch(setTodos(allTodos));
    } catch (error: any) {
      handleError(error.message);
    }
  }, []);

  const handleComplete = useCallback(
    async (id: string) => {
      try {
        const todo = todos.find((todo) => todo.id === id);
        if (todo) {
          const updatedTodo: Todo = {
            ...todo,
            completed: !todo.completed,
          };

          const db = await getDBConnection();
          await updateTodoSqlite(db, updatedTodo);
          dispatch(toggleComplete(id));
          await fetchTodos();
        }
      } catch (error: any) {
        handleError(error.message);
      }
    },
    [todos],
  );

  const handleDelete = useCallback((id: string) => {
    dispatch(
      showDialog({
        title: "Xác nhận",
        content: "Bạn có chắc là muốn xoá nhiệm vụ này không?",
        type: DialogType.ALERT,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        onConfirm: async () => {
          try {
            const db = await getDBConnection();
            await deleteTodoSqlite(db, id);
            dispatch(deleteTodo(id));
            fetchTodos();
            dispatch(hideDialog());
          } catch (error: any) {
            handleError(error.message);
          }
        },
      }),
    );
  }, []);

  const handleError = useCallback((message: string) => {
    dispatch(
      showDialog({
        title: "Lỗi",
        content: message,
        type: DialogType.ERROR,
        confirmButtonText: "OK",
      }),
    );
  }, []);

  return {
    handleComplete,
    handleDelete,
    fetchTodos,
  };
};

export default useMainViewModel;
