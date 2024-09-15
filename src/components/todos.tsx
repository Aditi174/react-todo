import { useSearchParams } from "react-router-dom";
import { useTodos } from "../store/todo";

function Todos() {
  const { todos, toggleToDoAsCompleted, onHandelDelete } = useTodos();

  const [searchparams] = useSearchParams();
  let todosData = searchparams.get("todos");

  let filteredTodos = todos;

  if (todosData === "active") {
    filteredTodos = filteredTodos.filter((todos) => !todos.completed);
  }

  if (todosData === "completed") {
    filteredTodos = filteredTodos.filter((todos) => todos.completed);
  }

  return (
    <ul className="main-task">
      {filteredTodos.map((todos) => {
        return (
          <li key={todos.id}>
            <input
              type="checkbox"
              id={`todo-${todos.id}`}
              checked={todos.completed}
              onChange={() => toggleToDoAsCompleted(todos.id)}
            />
            <label htmlFor={`todo-${todos.id}`}>{todos.task}</label>

            {todos.completed && (
              <button onClick={() => onHandelDelete(todos.id)} type="button">
                Delete
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default Todos;
