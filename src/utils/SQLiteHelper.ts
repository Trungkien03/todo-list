import { Todo } from "@app/types/todo";
import SQLite from "react-native-sqlite-storage";

SQLite.enablePromise(true);

// Open or create the SQLite database
export const getDBConnection = async () => {
  return SQLite.openDatabase({ name: "todos.db", location: "default" });
};

// Create the Todos table
export const createTable = async (db: SQLite.SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      priority TEXT,
      dueDate TEXT,
      completed INTEGER DEFAULT 0
    );`;
  await db.executeSql(query);
};

// Insert a new todo
export const addTodoSqlite = async (
  db: SQLite.SQLiteDatabase,
  todo: Omit<Todo, "id">,
) => {
  const query = `
    INSERT INTO todos (title, priority, dueDate, completed)
    VALUES (?, ?, ?, ?);
  `;
  await db.executeSql(query, [
    todo.title,
    todo.priority,
    todo.dueDate ? todo.dueDate.toISOString() : null,
    todo.completed ? 1 : 0,
  ]);
};

// Get all todos
export const getTodosSqlite = async (
  db: SQLite.SQLiteDatabase,
): Promise<Todo[]> => {
  const todos: Todo[] = [];
  const results = await db.executeSql("SELECT * FROM todos;");

  results.forEach((result) => {
    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);
      todos.push({
        id: row.id.toString(),
        title: row.title,
        dueDate: row.dueDate,
        priority: row.priority,
        completed: row.completed,
      });
    }
  });

  return todos;
};

export const updateTodoSqlite = async (
  db: SQLite.SQLiteDatabase,
  todo: Todo,
) => {
  const query = `
    UPDATE todos
    SET title = ?, priority = ?,dueDate = ?, completed = ?
    WHERE id = ?;
  `;

  await db.executeSql(query, [
    todo.title,
    todo.priority,
    todo.dueDate ? todo.dueDate : null,
    todo.completed ? 1 : 0,
    todo.id,
  ]);
};

export const deleteTodoSqlite = async (
  db: SQLite.SQLiteDatabase,
  id: string,
) => {
  const query = `DELETE FROM todos WHERE id = ?;`;
  await db.executeSql(query, [id]);
};
