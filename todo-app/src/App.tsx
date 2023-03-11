import React, { useState, useEffect } from "react";
import TodoList from "./component/TodoList/TodoList";
import { Todo } from "./App.inteface";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   const savedTodos = localStorage.getItem("todos");
  //   if (savedTodos) {
  //     setTodos(JSON.parse(savedTodos));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isMounted]);

  const handleToggleDone = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleSaveTodo = (todo: Todo, id?: string) => {
    console.log("todo:", todo);

    const newTodo = { ...todo, id: uuidv4() };
    let updatedTodos: Todo[];
    if (id) {
      console.log("has id");
      updatedTodos = todos.map((t) => (t.id === id ? todo : t));
    } else {
      console.log("not has id");
      updatedTodos = [...todos, newTodo];
    }
    setTodos(updatedTodos);
  };

  return (
    <div className="h-screen bg-gray-100">
      <div className="container mx-auto pt-8">
        <h1 className="text-center text-4xl font-bold mb-8">Todo App</h1>
        <TodoList
          todos={todos}
          onToggleDone={handleToggleDone}
          onDeleteTodo={handleDeleteTodo}
          onSaveTodo={handleSaveTodo}
        />
      </div>
    </div>
  );
}

export default App;
