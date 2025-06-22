"use client";

import { useState } from "react";
import axios from "axios";
import { Task } from "@/types/task";

interface Props {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({ task, onUpdate, onDelete }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleStatusToggle = async () => {
    try {
      setLoading(true);
      const updatedStatus = task.completed ? false : true;
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${task.id}`,
        {
          completed: updatedStatus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onUpdate(res.data);
    } catch (err) {
      console.error("❌ Failed to update status", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${task.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onDelete(task.id);
    } catch (err) {
      console.error("❌ Failed to delete task", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${task.id}`,
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onUpdate(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("❌ Failed to edit task", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border border-white/10 rounded-2xl bg-[#030412] shadow-sm">
      {/* Task Title and Status */}
      <div className="flex flex-col gap-2 w-full max-w-md">
        {isEditing ? (
          <input
            className="px-3 py-2 rounded-md bg-white/90 text-sm text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        ) : (
          <span
            className={`text-base font-medium ${
              task.completed ? "line-through text-gray-400" : "text-white"
            }`}
          >
            {task.title}
          </span>
        )}

        <span
          className={`text-xs px-2 py-1 rounded-full w-fit font-medium ${
            task.completed
              ? "bg-green-600/10 text-green-400"
              : "bg-yellow-500/10 text-yellow-400"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 items-center">
        {isEditing ? (
          <button
            onClick={handleEdit}
            disabled={loading}
            className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-sm text-white bg-slate-700 hover:bg-slate-600 rounded-md transition"
          >
            Edit
          </button>
        )}

        <button
          onClick={handleStatusToggle}
          disabled={loading}
          className={`px-3 py-1 text-sm rounded-md transition ${
            task.completed
              ? "bg-green-700 hover:bg-green-600 text-white"
              : "bg-yellow-600 hover:bg-yellow-500 text-white"
          }`}
        >
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-3 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
