import { addTodo, setTodos } from "@app/features/todoList/slices";
import { RootStackParams } from "@app/navigations/types/RootStackParams.type";
import { useAppDispatch } from "@app/stores";
import { showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import {
  addTodoSqlite,
  getDBConnection,
  getTodosSqlite,
} from "@app/utils/SQLiteHelper";
import { DateFormatter } from "@app/utils/dateUtils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import addTaskSchema, {
  addTaskSchemaDefaultValue,
} from "../schema/addTask.schema";
import { setIsLoadingAddTodo, setIsShowDatePicker } from "../slices";

const useAddTodoViewModel = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const dispatch = useAppDispatch();

  const methods = useForm({
    defaultValues: addTaskSchemaDefaultValue,
    resolver: yupResolver(addTaskSchema),
  });

  const handleDateChange = useCallback((event: any, selectedDate?: Date) => {
    dispatch(setIsShowDatePicker(false));
    if (event.type === "dismissed") {
      methods.setValue("dueDate", null);
    } else if (selectedDate) {
      methods.setValue("dueDate", selectedDate);
    }
  }, []);

  const handleAddTask = useCallback(async (data: any) => {
    dispatch(setIsLoadingAddTodo(true));
    try {
      const { title, description, dueDate, priority } = data;

      const db = await getDBConnection();
      const currentDateWithoutTime = DateFormatter.removeTimeFromDate(
        new Date(),
      );
      const dueDateWithoutTime = dueDate
        ? DateFormatter.removeTimeFromDate(new Date(dueDate))
        : null;

      if (dueDateWithoutTime && dueDateWithoutTime < currentDateWithoutTime) {
        dispatch(
          showDialog({
            title: "Lỗi",
            content: "Ngày hết hạn không hợp lệ",
            type: DialogType.WARNING,
          }),
        );
        return;
      }

      // Thêm task mới
      dispatch(
        addTodo({
          title,
          description,
          dueDate: dueDate ? new Date(dueDate) : undefined,
          priority: priority as "high" | "medium" | "low",
        }),
      );

      // Thêm vào SQLite
      await addTodoSqlite(db, {
        title,
        priority: priority as "high" | "medium" | "low",
        dueDate: dueDate ? new Date(dueDate) : undefined,
        completed: false,
      });

      const todos = await getTodosSqlite(db);
      dispatch(setTodos(todos));

      navigation.goBack();
    } catch (error: any) {
      dispatch(
        showDialog({
          title: "Error",
          content: error.message,
          type: DialogType.ERROR,
        }),
      );
    } finally {
      dispatch(setIsLoadingAddTodo(false));
    }
  }, []);
  return {
    handleAddTask,
    handleDateChange,
    methods,
  };
};

export default useAddTodoViewModel;
