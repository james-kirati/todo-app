import React, { useState } from "react";
import { Todo } from "../../App.inteface";
import TodoForm from "../TodoForm/TodoForm";
import TodoItem from "../TodoItem/TodoItem";
import { v4 as uuidv4 } from "uuid";

interface Props {
  todos: Todo[];
  onToggleDone: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onSaveTodo: (todo: Todo) => void;
}

const TodoList: React.FC<Props> = ({
  todos,
  onToggleDone,
  onDeleteTodo,
  onSaveTodo,
}: Props) => {
  const [showForm, setShowForm] = useState(false);

  const handleSaveTodo = (todo: Todo) => {
    onSaveTodo(todo);
    setShowForm(false);
  };

  return (
    <div className="p-4">
      {showForm && (
        <TodoForm
          onSaveTodo={(todo: Todo) => handleSaveTodo(todo)}
          onCancel={() => {
            setShowForm(false);
          }}
          initialTodo={null}
        />
      )}

      <ul className="divide-y divide-gray-200">
        {todos.map((todo) => (
          <TodoItem
            key={uuidv4()}
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
          Add New Task
        </button>
      </div>
    </div>
  );
};

export default TodoList;
