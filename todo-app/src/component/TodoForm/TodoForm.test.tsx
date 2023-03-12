import { fireEvent, render, screen } from "@testing-library/react";
import { Todo } from "../../App.inteface";
import TodoForm from "./TodoForm";

describe("TodoForm component", () => {
  const onCancel = jest.fn();
  const onSaveTodo = jest.fn();

  const todo: Todo = {
    id: "1",
    name: "Test Todo",
    description: "Test Description",
    startDate: new Date("2023-03-18"),
    endDate: new Date("2023-03-20"),
    isDone: false,
  };
  it("should render the form with the correct inputs", () => {
    render(<TodoForm onCancel={() => {}} onSaveTodo={() => {}} />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Start Date")).toBeInTheDocument();
    expect(screen.getByLabelText("End Date")).toBeInTheDocument();
  });

  it("should call handleSubmit with the correct todo data when form is submitted", () => {
    const mockHandleSubmit = jest.fn();
    render(
      <TodoForm
        initialTodo={todo}
        onCancel={onCancel}
        onSaveTodo={mockHandleSubmit}
      />
    );
    const nameInput = screen.getByLabelText("Name");
    const descriptionInput = screen.getByLabelText("Description");
    const startDateInput = screen.getByLabelText("Start Date");
    const endDateInput = screen.getByLabelText("End Date");
    const submitButton = screen.getByText("Save Changes");

    fireEvent.change(nameInput, { target: { value: "Updated Todo" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Updated Description" },
    });
    fireEvent.change(startDateInput, {
      target: { value: "2023-03-19" },
    });
    fireEvent.change(endDateInput, {
      target: { value: "2023-03-21" },
    });
    fireEvent.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalledWith({
      ...todo,
      name: "Updated Todo",
      description: "Updated Description",
      startDate: new Date("2023-03-19"),
      endDate: new Date("2023-03-21"),
    });
  });

  it("should call onCancel when cancel button is clicked", () => {
    render(
      <TodoForm
        initialTodo={todo}
        onCancel={onCancel}
        onSaveTodo={onSaveTodo}
      />
    );

    const cancelButton = screen.getByText("Cancel");

    fireEvent.click(cancelButton);

    expect(onCancel).toHaveBeenCalled();
  });

  it("should not save todo if end date is less than start date", () => {
    render(<TodoForm onSaveTodo={onSaveTodo} onCancel={onCancel} />);

    const nameInput = screen.getByLabelText("Name");
    const startDateInput = screen.getByLabelText("Start Date");
    const endDateInput = screen.getByLabelText("End Date");

    fireEvent.change(nameInput, { target: { value: "Test Todo" } });
    fireEvent.change(startDateInput, { target: { value: "2023-03-15" } });
    fireEvent.change(endDateInput, { target: { value: "2023-03-10" } });

    const createButton = screen.getByText("Create");
    fireEvent.click(createButton);

    expect(onSaveTodo).not.toHaveBeenCalled();
  });
});
