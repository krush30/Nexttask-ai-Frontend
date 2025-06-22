"use client";

import { useState } from "react";
import axios from "axios";
import { Task } from "@/types/task";

interface TaskFormProps {
  onTasksGenerated: (tasks: Task[]) => void;
}

const TaskForm = ({ onTasksGenerated }: TaskFormProps) => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/generate`,
        { topic },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onTasksGenerated(res.data.tasks);
      setTopic("");
    } catch (err: unknown) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Failed to generate tasks");
      } else {
        setError("Failed to generate tasks");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleGenerate}
      className="mb-8 p-6 bg-[#030412] border border-white/10 rounded-2xl shadow-md"
    >
      <label className="block mb-3 text-sm font-medium text-white tracking-wide">
        🤖 What&#39;s your goal today?
      </label>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Learn JavaScript"
          className="flex-grow px-4 py-3 text-sm text-white placeholder:text-gray-400 bg-[#0c0f1a] border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 transition"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 rounded-md transition disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate Tasks"}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-400 font-medium tracking-wide">
          ⚠️ {error}
        </p>
      )}
    </form>
  );
};

export default TaskForm;
