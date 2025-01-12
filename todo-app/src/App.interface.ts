export interface Todo {
  id: string;
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  isDone: boolean;
}
