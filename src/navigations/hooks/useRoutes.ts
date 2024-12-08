import MainScreens from "@app/features";
import { Route } from "../types/Route.type";

const useRoutes = (): Route[] => {
  const routes: Route[] = [
    {
      name: "TodoList",
      component: MainScreens.TodoListScreen,
    },
    {
      name: "AddTodo",
      component: MainScreens.AddTodoScreen,
      options: {
        presentation: "modal",
      },
    },
  ];

  return routes;
};

export default useRoutes;
