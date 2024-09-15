import { createContext, useContext } from "react";
import { useState } from "react";

interface Todos {
  id: string;
  task: string;
  completed: boolean;
  created: Date;
}

interface ToDoContext {
  todos: Todos[];
  onhandelToDo: (task: string) => void;
  toggleToDoAsCompleted: (id: string) => void;
  onHandelDelete: (id: string) => void;
}

export const todosContext = createContext<ToDoContext | null>(null);

export function ToDosProvider({ children }: any) {
  const [todos, setTodos] = useState<Todos[]>(() => {
    try {
      const data = localStorage.getItem("key") || "[]";
      return JSON.parse(data) as Todos[];
    } catch {
      return [];
    }
  });
  function onhandelToDo(task: string) {
    setTodos((preview) => {
      const newToDo: Todos[] = [
        {
          id: String(Math.random()),
          task: task,
          completed: false,
          created: new Date(),
        },
        ...preview,
      ];

      console.log(preview);
      console.log(newToDo);

      localStorage.setItem("key", JSON.stringify(newToDo));
      return newToDo;
    });
  }

  const toggleToDoAsCompleted = (id: string) => {
    setTodos((preview) => {
      let newtodo = preview.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem("todos", JSON.stringify(newtodo));

      return newtodo;
    });
  };

  const onHandelDelete = (id: string) => {
    setTodos((preview) => {
      const updatedTodos = preview.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    });
  };

  return (
    <todosContext.Provider
      value={{ todos, onhandelToDo, toggleToDoAsCompleted, onHandelDelete }}
    >
      {children}
    </todosContext.Provider>
  );
}

export default ToDosProvider;

export const useTodos = () => {
  const todoConsumer = useContext(todosContext);
  if (!todoConsumer) {
    throw new Error("useTodos must be used within a ToDoProvider");
  }
  return todoConsumer;
};
