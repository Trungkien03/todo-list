import TextView from "@app/components/UI/TextView";
import useSize from "@app/hooks/useSize";
import { ThemeType } from "@app/themes";
import { Todo } from "@app/types/todo";
import { DateFormatter } from "@app/utils/dateUtils";
import getDueDateStatus from "@app/utils/getDueDateStatus";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import icons from "assets/icons";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  HStack,
  Image,
  Input,
  KeyboardAvoidingView,
  Spacer,
  useTheme,
  VStack,
} from "native-base";
import React, { memo, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Animated, Platform, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import useTodoItemViewModel from "../viewmodels/useTodoItemViewModel";

interface TodoItemProps {
  item: Todo;
  onComplete: () => void;
  onDelete: () => void;
}

const TodoItem = ({ item, onComplete, onDelete }: TodoItemProps) => {
  const theme = useTheme() as ThemeType;
  const { fontSize } = useSize();
  const { text, color } = getDueDateStatus(item);

  const {
    handleDateChange,
    onSubmit,
    toggleEditMode,
    methods,
    isEditing,
    setShowDatePicker,
    showDatePicker,
  } = useTodoItemViewModel();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods;

  useEffect(() => {
    if (isEditing) {
      setValue("id", Number(item.id));
      setValue("title", item.title);
      setValue("dueDate", item.dueDate ?? null);
      setValue("priority", item.priority ?? "low");
      setValue("completed", item.completed ?? false);
    }
  }, [isEditing]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Animated.View style={[{ marginVertical: 5 }]}>
        <VStack
          space={6}
          bg={theme.colors.card.background}
          borderRadius="lg"
          py={4}
          px={6}
          shadow={2}
        >
          {!isEditing && (
            <HStack alignItems="flex-start" justifyContent="space-between">
              <HStack space={4}>
                <Checkbox
                  mt={1}
                  isChecked={item.completed}
                  onChange={onComplete}
                  value={`${item.id}`}
                  accessibilityLabel="Complete"
                  colorScheme="green"
                  aria-label="mark complete"
                />
                <VStack space={2}>
                  <TextView
                    fontSize="lg"
                    fontWeight="bold"
                    strikeThrough={item.completed}
                  >
                    {item.title}
                  </TextView>

                  <TextView
                    strikeThrough={item.completed}
                    fontSize="md"
                    color={
                      item.priority === "high"
                        ? "red.500"
                        : item.priority === "medium"
                          ? "yellow.500"
                          : "green.500"
                    }
                  >
                    Ưu tiên{" "}
                    {item.priority === "high"
                      ? "cao"
                      : item.priority === "medium"
                        ? "trung bình"
                        : "thấp"}
                  </TextView>

                  <Spacer />
                </VStack>
              </HStack>

              {/* Nút sửa và ngày */}
              <VStack alignItems="flex-end">
                <TouchableOpacity
                  onPress={toggleEditMode}
                  accessibilityLabel="Edit task"
                >
                  <Image
                    source={icons.pen}
                    resizeMode="contain"
                    alt="Edit Icon"
                    accessibilityLabel="Edit"
                  />
                </TouchableOpacity>

                {!item.completed && (
                  <TextView fontSize="sm" color={color}>
                    {text}
                  </TextView>
                )}

                <Spacer />
              </VStack>
            </HStack>
          )}

          {isEditing && (
            <>
              {/* Title Field */}
              <HStack justifyContent="flex-end" alignItems="center">
                <TouchableOpacity
                  onPress={onDelete}
                  accessibilityLabel="Delete Task"
                >
                  <HStack alignItems="center" space={2}>
                    <Image
                      source={icons.delete}
                      resizeMode="contain"
                      w={4}
                      alt="Delete Icon"
                      accessibilityLabel="Delete"
                    />
                    <TextView>Xoá</TextView>
                  </HStack>
                </TouchableOpacity>
              </HStack>
              <VStack space={6} mt={-10}>
                <VStack>
                  <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={value}
                        onChangeText={onChange}
                        placeholder="Nhập tiêu đề"
                        fontSize={fontSize}
                        fontWeight="bold"
                        variant="unstyled"
                        p={0}
                      />
                    )}
                  />
                  {errors.title && (
                    <TextView fontSize="xs" color="red.500">
                      {errors.title.message}
                    </TextView>
                  )}
                  <Divider />
                </VStack>

                {/* Due Date Field */}
                <VStack>
                  <HStack justifyContent="space-between" alignItems="center">
                    <TextView fontWeight="bold" color={theme.colors.text}>
                      Thời hạn
                    </TextView>
                    <Controller
                      control={control}
                      name="dueDate"
                      render={({ field: { value } }) => (
                        <TextView
                          textAlign="right"
                          onPress={() => setShowDatePicker(true)}
                        >
                          {DateFormatter.formatToDDMMYYYY(
                            new Date(value ?? ""),
                          ) || "Chọn ngày"}
                        </TextView>
                      )}
                    />
                  </HStack>
                  {errors.dueDate && (
                    <TextView fontSize="xs" color="red.500">
                      {errors.dueDate.message}
                    </TextView>
                  )}
                  <Divider />
                </VStack>

                {showDatePicker && (
                  <RNDateTimePicker
                    mode="date"
                    value={new Date(item.dueDate ?? new Date())}
                    onChange={handleDateChange}
                    display={Platform.OS === "ios" ? "inline" : "default"}
                  />
                )}

                {/* Priority Field */}
                <VStack>
                  <HStack justifyContent="space-between" alignItems="center">
                    <TextView fontWeight="bold" color={theme.colors.text}>
                      Mức độ ưu tiên
                    </TextView>
                    <Box flex={1}>
                      <Controller
                        control={control}
                        name="priority"
                        render={({ field: { onChange, value } }) => (
                          <RNPickerSelect
                            onValueChange={onChange}
                            value={value}
                            placeholder={{
                              label: "Chọn mức độ ưu tiên",
                              value: null,
                            }}
                            items={[
                              { label: "Cao", value: "high" },
                              { label: "Trung bình", value: "medium" },
                              { label: "Thấp", value: "low" },
                            ]}
                            useNativeAndroidPickerStyle={false}
                            style={{
                              inputAndroid: {
                                textAlign: "right",
                                color: theme.colors.text,
                                fontSize: 16,
                              },
                              inputIOS: {
                                textAlign: "right",
                                color: theme.colors.text,
                                fontSize: 16,
                              },
                            }}
                          />
                        )}
                      />
                    </Box>
                  </HStack>
                  {errors.priority && (
                    <TextView fontSize="xs" color="red.500">
                      {errors.priority.message}
                    </TextView>
                  )}
                  <Divider />
                </VStack>

                <Button
                  mt={2}
                  colorScheme="green"
                  _text={{ color: "white", fontWeight: "bold" }}
                  borderRadius="3xl"
                  px={6}
                  py={2}
                  alignSelf="center"
                  onPress={handleSubmit(onSubmit)}
                >
                  Xong
                </Button>
              </VStack>
            </>
          )}
        </VStack>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default memo(TodoItem);
