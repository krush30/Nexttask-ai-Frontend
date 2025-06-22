"use client";

import { Task } from "@/types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onUpdate: (updatedTask: Task) => void;
  onDelete: (deletedTaskId: string) => void;
}

const TaskList = ({ tasks, onUpdate, onDelete }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <p className="text-gray-500 ">
        No tasks found. Start by generating some!
      </p>
    );
  }

  return (
    <div className="grid gap-4  ">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
