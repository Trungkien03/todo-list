import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Box,
  Button,
  Divider,
  HStack,
  Input,
  useTheme,
  VStack,
} from "native-base";
import React, { useLayoutEffect } from "react";
import { Controller } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import TextView from "@app/components/UI/TextView";
import useSize from "@app/hooks/useSize";
import { RootStackParams } from "@app/navigations/types/RootStackParams.type";
import { ThemeType } from "@app/themes";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import useAddTodoViewModel from "../viewmodels/useAddTodoViewModel";

const AddTaskScreen = () => {
  const { fontSize } = useSize();
  const theme = useTheme() as ThemeType;

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const {
    methods,
    handleAddTask,
    handleDateChange,
    showDatePicker,
    setShowDatePicker,
  } = useAddTodoViewModel();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const dueDate = watch("dueDate");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Thêm công việc",
      headerTitleStyle: { fontSize: 22 },
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: theme.colors.background },
      headerTintColor: "white",
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background, padding: 10 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <VStack p={4} bg={theme.colors.white} borderRadius={"xl"} space={8}>
        {/* Task Title Input */}
        <VStack>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <Input
                fontWeight="bold"
                value={value}
                fontSize={fontSize}
                onChangeText={onChange}
                placeholder="Tiêu đề"
                borderRadius="md"
                variant={"unstyled"}
                p={0}
              />
            )}
          />
          {errors.title && (
            <TextView color="red.500" fontSize="xs">
              {errors.title.message}
            </TextView>
          )}
          <Divider />
        </VStack>

        {/* Date Picker Section */}
        <VStack>
          <Controller
            control={control}
            name="dueDate"
            render={({ field: { value } }) => (
              <VStack>
                <HStack justifyContent="space-between" alignItems="center">
                  <TextView fontWeight="bold" color="black">
                    Thời hạn
                  </TextView>
                  <TextView onPress={() => setShowDatePicker(true)}>
                    {value ? new Date(value).toLocaleDateString() : "Chọn ngày"}
                  </TextView>
                </HStack>
              </VStack>
            )}
          />
          {errors.dueDate && (
            <TextView color="red.500" fontSize="xs">
              {errors.dueDate.message}
            </TextView>
          )}
          <Divider />
          {showDatePicker && (
            <DateTimePicker
              value={dueDate ? new Date(dueDate) : new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </VStack>

        {/* Priority Dropdown */}
        <VStack>
          <Controller
            control={control}
            name="priority"
            render={({ field: { onChange, value } }) => (
              <HStack justifyContent="space-between" alignItems="center">
                <TextView fontWeight="bold">Mức độ ưu tiên</TextView>
                <Box flex={1} alignItems="flex-end">
                  <RNPickerSelect
                    onValueChange={onChange}
                    value={value}
                    placeholder={{
                      label: "Chọn mức độ ưu tiên",
                      value: null,
                      color: "gray",
                    }}
                    items={[
                      { label: "Cao", value: "high" },
                      { label: "Trung bình", value: "medium" },
                      { label: "Thấp", value: "low" },
                    ]}
                    useNativeAndroidPickerStyle={false}
                    style={{
                      viewContainer: {
                        borderWidth: 1,
                        borderColor: "gray",
                        borderRadius: 8,
                        paddingHorizontal: 10,
                        backgroundColor: "#f8f8f8",
                      },
                      placeholder: {
                        color: theme.colors.text,
                        fontSize: 16,
                      },
                      inputAndroid: {
                        color: theme.colors.text,
                        fontSize: 16,
                        textAlign: "right",
                      },
                      inputIOS: {
                        color: theme.colors.text,
                        fontSize: 16,
                        textAlign: "right",
                      },
                    }}
                  />
                </Box>
              </HStack>
            )}
          />

          {errors.priority && (
            <TextView color="red.500" fontSize="xs">
              {errors.priority.message}
            </TextView>
          )}
          <Divider />
        </VStack>

        {/* Add Task Button */}
        <Button
          mt={4}
          colorScheme="green"
          _text={{ color: "white" }}
          borderRadius="3xl"
          px={6}
          py={2}
          alignSelf="center"
          onPress={handleSubmit(handleAddTask)}
        >
          Thêm công việc
        </Button>
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default AddTaskScreen;
