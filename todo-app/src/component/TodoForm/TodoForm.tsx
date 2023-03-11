import React, { useState } from "react";
import { Todo } from "../../App.inteface";
import DatePicker from "react-datepicker";
import { v4 as uuidv4 } from "uuid";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  onCancel: () => void;
  onSaveTodo: (todo: Todo) => void;
  initialTodo?: Todo | null;
}

function TodoForm({ onCancel, onSaveTodo, initialTodo }: Props) {
  const [name, setName] = useState(initialTodo?.name ?? "");
  const [description, setDescription] = useState(
    initialTodo?.description ?? ""
  );
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isDone = false;
    const id = uuidv4();

    const newTodo: Todo = {
      id,
      name,
      description,
      startDate,
      endDate,
      isDone,
    };

    if (initialTodo) {
      newTodo.id = initialTodo.id;
      onSaveTodo(newTodo);
    } else {
      onSaveTodo(newTodo);
    }

    setName("");
    setDescription("");
    setStartDate(null);
    setEndDate(null);
    onCancel();
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-gray-900 bg-opacity-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          {initialTodo ? "Edit Todo" : "Create Todo"}
        </h2>

        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="border rounded-lg p-2 w-full"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="border rounded-lg p-2 w-full"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="startDate">Start Date</label>
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="Start Date"
            className="border rounded-lg p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="endDate">End Date</label>
          <DatePicker
            id="endDate"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="End Date"
            className="border rounded-lg p-2 w-full"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="px-4 py-2 text-gray-600"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            {initialTodo ? "Save Changes" : "Create Todo"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
