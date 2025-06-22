export interface Task {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  userId: string;
  createdAt: string;
}
