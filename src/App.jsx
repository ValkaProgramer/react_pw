import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./Button";

const useTodos = () => {
  const [todos, _setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );
  const setTodos = (todos) => {
    _setTodos(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const matchedTodo = newTodos.find((todo) => todo.id === id);
    matchedTodo.done = !matchedTodo.done;
    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text: text, done: false };

    setTodos([newTodo, ...todos]);
  };

  return { todos, setTodos, toggleTodo, removeTodo, addTodo };
};

function App() {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("All");
  const [theme, _setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const setTheme = (theme) => {
    _setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  //const [theme, setTheme] = useState("dark")

  const trimmedText = text.trim();

  const { todos, setTodos, toggleTodo, removeTodo, addTodo } = useTodos();

  const doneTodos = todos.filter((todo) => todo.done);
  const ipTodos = todos.filter((todo) => !todo.done);
  const currentTodos =
    filter === "All"
      ? [...ipTodos, ...doneTodos]
      : filter === "IP"
      ? ipTodos
      : doneTodos;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (trimmedText) {
      addTodo(trimmedText);
      setText("");
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <div className="max-w-3xl mt-6 mx-auto">
      <Button onClick={() => toggleTheme()}>Dark/Light {theme}</Button>
      <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        <input
          className="border border-gray-800 dark:border-gray-200 flex-1 rounded-md px-2 bg-white dark:bg-black"
          value={text}
          type="text"
          placeholder="Enter Todo"
          onChange={(event) => setText(event.target.value)}
        />
        <Button disabled={!trimmedText} type="submit">
          Add Todo
        </Button>
      </form>
      <div className="flex gap-2 my-2">
        <Button
          className={filter === "All" ? "bg-red-700" : ""}
          onClick={() => setFilter("All")}
        >
          All ({todos.length})
        </Button>
        <Button
          className={filter === "IP" ? "bg-blue-700" : ""}
          onClick={() => setFilter("IP")}
        >
          In Progress ({ipTodos.length})
        </Button>
        <Button
          className={filter === "Done" ? "bg-green-700" : ""}
          onClick={() => setFilter("Done")}
        >
          Done ({doneTodos.length})
        </Button>
      </div>
      <ul className="flex gap-2 flex-col">
        {currentTodos.map((todo) => (
          <li key={todo.id} className="flex gap-2 w-full items-center">
            <div
              onClick={(event) => toggleTodo(todo.id)}
              className="flex gap-2"
            >
              <input type="checkbox" checked={todo.done} />
              <span className={todo.done ? "line-through" : ""}>
                {todo.text}
              </span>
            </div>
            <Button
              onClick={(event) => removeTodo(todo.id)}
              className="ml-auto py-0 px-2"
            >
              x
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
