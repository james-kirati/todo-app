import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "./TodoItem";
import { Todo } from "../../App.interface";

const todo: Todo = {
  id: "1",
  name: "Task 1",
  description: "Description 1",
  startDate: new Date("2022-03-15"),
  endDate: new Date("2022-03-20"),
  isDone: false,
};

describe("TodoItem", () => {
  const onToggleDone = jest.fn();
  const onDeleteTodo = jest.fn();
  const onSaveTodo = jest.fn();
  it("renders todo item correctly", () => {
    render(
      <TodoItem
        todo={todo}
        onToggleDone={onToggleDone}
        onDeleteTodo={onDeleteTodo}
        onSaveTodo={onSaveTodo}
      />
    );
    expect(screen.getByText(todo.name)).toBeInTheDocument();
    expect(screen.getByText(todo.description)).toBeInTheDocument();
  });

  it("calls onToggleDone function when done button is clicked", () => {
    render(
      <TodoItem
        todo={todo}
        onToggleDone={onToggleDone}
        onDeleteTodo={onDeleteTodo}
        onSaveTodo={onSaveTodo}
      />
    );
    const checkbox = screen.getByTitle("checkbox");
    fireEvent.click(checkbox);

    expect(onToggleDone).toHaveBeenCalledTimes(1);
    expect(onToggleDone).toHaveBeenCalledWith(todo.id);
  });

  it("calls onDeleteTodo function when delete button is clicked", () => {
    render(
      <TodoItem
        todo={todo}
        onToggleDone={onToggleDone}
        onDeleteTodo={onDeleteTodo}
        onSaveTodo={onSaveTodo}
      />
    );
    const deleteButton = screen.getByTitle("delete");
    fireEvent.click(deleteButton);

    expect(onDeleteTodo).toHaveBeenCalled();
  });

  it("should show edit form when edit button is clicked", () => {
    render(
      <TodoItem
        todo={todo}
        onToggleDone={onToggleDone}
        onDeleteTodo={onDeleteTodo}
        onSaveTodo={onSaveTodo}
      />
    );

    const editButton = screen.getByTitle("edit");
    fireEvent.click(editButton);

    expect(screen.getByText("Edit Todo")).toBeInTheDocument();
  });
});
