import React, { useState } from "react";
import { Todo } from "../../App.interface";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DATE_FORMAT } from "../../utils/utils";

interface Props {
  onCancel: () => void;
  onSaveTodo: (todo: Todo) => void;
  initialTodo?: Todo | null;
}

const TodoForm: React.FC<Props> = ({ onCancel, onSaveTodo, initialTodo }) => {
  const [name, setName] = useState(initialTodo?.name ?? "");
  const [description, setDescription] = useState(
    initialTodo?.description ?? ""
  );
  const [startDate, setStartDate] = useState<Date | null>(
    initialTodo?.startDate ? new Date(initialTodo?.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState<Date | null>(
    initialTodo?.endDate ? new Date(initialTodo?.endDate) : new Date()
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const todo: Todo = {
      id: "",
      name,
      description,
      startDate,
      endDate,
      isDone: false,
    };

    if (!todo.name || !todo.startDate || !todo.endDate) {
      alert("Please provide all the required fields.");
      return;
    }

    if (todo.endDate < todo.startDate) {
      alert("End date cannot be less than start date.");
      return;
    }

    if (initialTodo) {
      todo.id = initialTodo.id;
      onSaveTodo(todo);
    } else {
      onSaveTodo(todo);
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
          <span className="text-red-500">*</span>
          <input
            type="text"
            id="name"
            className="border rounded-lg p-2 w-full"
            placeholder="Enter task name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="border rounded-lg p-2 w-full"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="startDate">Start Date</label>
          <span className="text-red-500">*</span>
          <DatePicker
            id="startDate"
            selected={startDate}
            minDate={new Date()}
            onChange={(date) => setStartDate(date)}
            dateFormat={DATE_FORMAT}
            placeholderText="Start Date"
            className="border rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="endDate">End Date</label>
          <span className="text-red-500">*</span>
          <DatePicker
            id="endDate"
            selected={endDate}
            minDate={startDate}
            onChange={(date) => setEndDate(date)}
            dateFormat={DATE_FORMAT}
            placeholderText="End Date"
            className="border rounded-lg p-2 w-full"
            required
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
            {initialTodo ? "Save Changes" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
