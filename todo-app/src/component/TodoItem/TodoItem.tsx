import React, { useState } from "react";
import { Todo } from "../../App.inteface";
import { formatDate } from "../../utils/utils";
import classNames from "classnames";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

interface Props {
  todo: Todo;
  onToggleDone: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onSaveTodo: (todo: Todo, id?: string) => void;
}

function TodoItem({ todo, onToggleDone, onDeleteTodo, onSaveTodo }: Props) {
  const [showForm, setShowForm] = useState(false);

  const handleToggleDone = () => {
    onToggleDone(todo.id);
  };

  const handleDeleteTodo = () => {
    onDeleteTodo && onDeleteTodo(todo.id);
  };

  const handleEditTodo = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSaveTodo = (updatedTodo: Todo) => {
    onSaveTodo && onSaveTodo(updatedTodo, todo.id);
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
        <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Todo</h2>
            <div className="mb-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="border rounded-lg p-2 w-full"
                placeholder="Name"
                defaultValue={todo.name}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="border rounded-lg p-2 w-full"
                placeholder="Description"
                defaultValue={todo.description}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                className="border rounded-lg p-2 w-full"
                defaultValue={
                  todo.startDate
                    ? formatDate(new Date(todo.startDate), "yyyy-MM-dd")
                    : formatDate(new Date(), "yyyy-MM-dd")
                }
              />
            </div>
            <div className="mb-4">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                className="border rounded-lg p-2 w-full"
                defaultValue={
                  todo.endDate
                    ? formatDate(new Date(todo.endDate), "yyyy-MM-dd")
                    : formatDate(new Date(), "yyyy-MM-dd")
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 text-gray-600 mr-2"
                onClick={handleCloseForm}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => {
                  const name = (
                    document.getElementById("name") as HTMLInputElement
                  ).value;
                  const description = (
                    document.getElementById("description") as HTMLInputElement
                  ).value;
                  const startDate = new Date(
                    (
                      document.getElementById("startDate") as HTMLInputElement
                    ).value
                  );
                  const endDate = new Date(
                    (
                      document.getElementById("endDate") as HTMLInputElement
                    ).value
                  );
                  handleSaveTodo({
                    ...todo,
                    name,
                    description,
                    startDate,
                    endDate,
                  });
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
