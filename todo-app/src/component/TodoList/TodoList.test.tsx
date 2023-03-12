import React from "react";
import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";
import { Todo } from "../../App.inteface";

describe("TodoList", () => {
  const todos: Todo[] = [
    {
      id: "1",
      name: "Task 1",
      description: "Description 1",
      startDate: new Date("2022-01-01"),
      endDate: new Date("2022-01-05"),
      isDone: false,
    },
    {
      id: "2",
      name: "Task 2",
      description: "Description 2",
      startDate: new Date("2022-01-06"),
      endDate: new Date("2022-01-10"),
      isDone: true,
    },
  ];

  it("displays the correct todo information", () => {
    render(
      <TodoList
        todos={todos}
        onToggleDone={() => {}}
        onDeleteTodo={() => {}}
        onSaveTodo={() => {}}
      />
    );
    const todoName = screen.getByText("Task 1");
    const todoDescription = screen.getByText("Description 1");
    expect(todoName).toBeInTheDocument();
    expect(todoDescription).toBeInTheDocument();
  });
});
