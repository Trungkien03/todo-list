import TextView from "@app/components/UI/TextView";
import { RootStackParams } from "@app/navigations/types/RootStackParams.type";
import { useAppSelector } from "@app/stores";
import { ThemeType } from "@app/themes";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import images from "assets/images";
import {
  Box,
  Button,
  FlatList,
  Icon,
  Image,
  useTheme,
  VStack,
} from "native-base";
import React, { useLayoutEffect } from "react";
import { RefreshControl } from "react-native";
import TodoItem from "../components/TodoItem";
import useMainViewModel from "../viewmodels/useTodoListViewModel";
import useSize from "@app/hooks/useSize";

const TodoListScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { todos, isLoadingGetTodo } = useAppSelector((state) => state.todoList);
  const { handleComplete, handleDelete, fetchTodos } = useMainViewModel();
  const theme = useTheme() as ThemeType;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Danh sách công việc",
      headerTitleStyle: { fontSize: 22 },
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerTintColor: "white",
    });
  }, []);

  return (
    <VStack flex={1} background={theme.colors.background} px={4} pb={4}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoadingGetTodo}
            onRefresh={fetchTodos}
          />
        }
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Box key={item.id.toString()}>
            <TodoItem
              item={item}
              onComplete={() => handleComplete(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          </Box>
        )}
        ListEmptyComponent={
          <VStack flex={1} justifyContent="center" alignItems="center">
            <Image source={images.check_list_empty} size={"xl"} alt="Empty" />
            <TextView color="white" fontSize="xl" mt={4}>
              What do you want to do today?
            </TextView>
          </VStack>
        }
      />

      <Button
        bg={theme.colors.red[500]}
        borderRadius="2xl"
        shadow={3}
        endIcon={<Icon as={MaterialIcons} size={6} name="add" color="white" />}
        _pressed={{ bg: theme.colors.primary[600] }}
        onPress={() => navigation.navigate("AddTodo")}
        _text={{ color: "white", bold: true }}
      >
        Tạo task mới
      </Button>
    </VStack>
  );
};

export default TodoListScreen;
