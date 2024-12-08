// src/types/todo.ts
export type Priority = "low" | "medium" | "high";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
  priority: Priority;
}

export type { Todo };
