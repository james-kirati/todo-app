import React, { useState } from "react";
import { Todo } from "../../App.inteface";
import TodoForm from "../TodoForm/TodoForm";
import TodoItem from "../TodoItem/TodoItem";

interface Props {
  todos: Todo[];
  onToggleDone: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onSaveTodo: (todo: Todo, id?: string) => void;
}

function TodoList({ todos, onToggleDone, onDeleteTodo, onSaveTodo }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleSaveTodo = (todo: Todo, id?: string) => {
    onSaveTodo(todo, id);
    setShowForm(false);
  };

  return (
    <div className="p-4">
      {showForm && (
        <TodoForm
          onSaveTodo={
            editingTodo
              ? (todo: Todo) => handleSaveTodo(todo, editingTodo.id)
              : (todo: Todo) => handleSaveTodo(todo)
          }
          onCancel={() => {
            setEditingTodo(null);
            setShowForm(false);
          }}
          initialTodo={editingTodo}
        />
      )}

      <ul className="divide-y divide-gray-200">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleDone={onToggleDone}
            onDeleteTodo={onDeleteTodo}
            onSaveTodo={handleSaveTodo}
          />
        ))}
      </ul>

      <div className="flex justify-center items-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded text-center"
          onClick={() => setShowForm(true)}
        >
          Please Add Todo Task
        </button>
      </div>
    </div>
  );
}

export default TodoList;
