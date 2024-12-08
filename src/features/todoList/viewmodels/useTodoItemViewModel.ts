import { Todo } from "@app/types/todo";
import { getDBConnection, updateTodoSqlite } from "@app/utils/SQLiteHelper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Animated, LayoutAnimation } from "react-native";
import editTaskSchema, {
  EditTaskSchemaDefaultValue,
  editTaskSchemaDefaultValue,
} from "../schema/editTask.schema";
import { useAppDispatch } from "@app/stores";
import { showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import { editTodo } from "../slices";
import { DateFormatter } from "@app/utils/dateUtils";

const useTodoItemViewModel = () => {
  const animatedHeight = useRef(new Animated.Value(60)).current;
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const methods = useForm({
    defaultValues: editTaskSchemaDefaultValue,
    resolver: yupResolver(editTaskSchema),
  });

  const toggleEditMode = useCallback(() => {
    LayoutAnimation.spring();
    setIsEditing((prev) => !prev);
  }, []);

  const onSubmit = useCallback(async (data: EditTaskSchemaDefaultValue) => {
    console.log("Saved Task:", data);

    const currentDateWithoutTime = DateFormatter.removeTimeFromDate(new Date());
    const dueDateWithoutTime = data.dueDate
      ? DateFormatter.removeTimeFromDate(new Date(data.dueDate))
      : null;

    if (dueDateWithoutTime && dueDateWithoutTime < currentDateWithoutTime) {
      dispatch(
        showDialog({
          title: "Lỗi",
          content: "Ngày hoàn thành không thể ở quá khứ.",
          type: DialogType.WARNING,
        }),
      );
      return;
    }

    try {
      const db = await getDBConnection();
      const updatedTodo: Todo = {
        id: data.id.toString(),
        title: data.title,
        dueDate: data.dueDate ?? undefined,
        priority: data.priority,
        completed: data.completed,
      };
      await updateTodoSqlite(db, updatedTodo);
      dispatch(
        editTodo({
          id: data.id.toString(),
          dueDate: data.dueDate ?? undefined,
          priority: data.priority,
          title: data.title,
          completed: data.completed,
        }),
      );
      toggleEditMode();
    } catch {
      dispatch(
        showDialog({
          title: "Lỗi",
          content: "Lỗi khi cập nhật thông tin công việc",
          type: DialogType.ERROR,
        }),
      );
    }
  }, []);

  const handleDateChange = useCallback((event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (event.type === "dismissed") {
      methods.setValue("dueDate", null);
    } else if (selectedDate) {
      methods.setValue("dueDate", selectedDate);
    }
  }, []);

  return {
    onSubmit,
    handleDateChange,
    toggleEditMode,
    animatedHeight,
    isEditing,
    showDatePicker,
    setShowDatePicker,
    methods,
  };
};

export default useTodoItemViewModel;
