import React, { useState } from "react";
import { Todo } from "../../App.inteface";
import { formatDate } from "../../utils/utils";
import classNames from "classnames";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import TodoForm from "../TodoForm/TodoForm";

interface Props {
  todo: Todo;
  onToggleDone: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onSaveTodo: (todo: Todo) => void;
}

function TodoItem({ todo, onToggleDone, onDeleteTodo, onSaveTodo }: Props) {
  const [showForm, setShowForm] = useState(false);

  const handleToggleDone = () => {
    onToggleDone(todo.id);
  };

  const handleDeleteTodo = () => {
    onDeleteTodo(todo.id);
  };

  const handleEditTodo = () => {
    setShowForm(true);
  };

  const handleSaveTodo = (todo: Todo) => {
    onSaveTodo(todo);
    setShowForm(false);
  };

  return (
    <li className="flex justify-between items-center p-4">
      <div className="flex items-center">
        <input
          aria-label="checlbox"
          type="checkbox"
          checked={todo.isDone}
          onChange={handleToggleDone}
          className="mr-4"
        />
        <div className={classNames("flex-1", { "line-through": todo.isDone })}>
          <h3 className="text-lg font-bold">{todo.name}</h3>
          <p className="text-gray-500">{todo.description}</p>
          <p className="text-sm text-gray-500">
            {todo.startDate
              ? formatDate(new Date(todo.startDate), "yyyy-MM-dd")
              : formatDate(new Date(), "yyyy-MM-dd")}{" "}
            -{" "}
            {todo.endDate
              ? formatDate(new Date(todo.endDate), "yyyy-MM-dd")
              : formatDate(new Date(), "yyyy-MM-dd")}
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <button
          type="button"
          onClick={handleEditTodo}
          className="text-blue-500"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={handleDeleteTodo}
          className="ml-2 text-red-500"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>

      {showForm && (
        <TodoForm
          onSaveTodo={(todo: Todo) => handleSaveTodo(todo)}
          onCancel={() => {
            setShowForm(false);
          }}
          initialTodo={todo}
        />
      )}
    </li>
  );
}

export default TodoItem;
