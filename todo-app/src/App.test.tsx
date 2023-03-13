import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the TodoList component", () => {
    render(<App />);
    const todoListElement = screen.getByText("Todo App");
    expect(todoListElement).toBeInTheDocument();
  });

  it("adds a new todo when the 'Add New Task' button is clicked", () => {
    render(<App />);

    const addButtonElement = screen.getByText("Add New Task");

    fireEvent.click(addButtonElement);

    const nameInputElement = screen.getByLabelText("Name");
    fireEvent.change(nameInputElement, { target: { value: "Test Todo" } });

    const startDateInputElement = screen.getByLabelText("Start Date");
    fireEvent.change(startDateInputElement, {
      target: { value: "2022-05-01" },
    });

    const endDateInputElement = screen.getByLabelText("End Date");
    fireEvent.change(endDateInputElement, {
      target: { value: "2022-05-31" },
    });

    const saveButtonElement = screen.getByText("Create");
    fireEvent.click(saveButtonElement);

    const todoNameElement = screen.getByText("Test Todo");
    expect(todoNameElement).toBeInTheDocument();
  });
});
