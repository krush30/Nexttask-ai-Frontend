"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { Task } from "@/types/task"; // adjust path if needed
import Hero from "../HeroFIles/Hero";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const DashboardPage = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setTasks(res.data))
      .catch((err) => {
        setError("Failed to load tasks");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <section className="min-h-screen   px-4 py-10">
      <Hero />

      <h1 className="text-3xl font-semibold mb-6">Welcome to your Dashboard</h1>
      <TaskForm
        onTasksGenerated={(newTasks) =>
          setTasks((prev) => [...newTasks, ...prev])
        }
      />

      <TaskList
        tasks={tasks}
        onUpdate={(updatedTask) =>
          setTasks((prev) =>
            prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
          )
        }
        onDelete={(deletedId) =>
          setTasks((prev) => prev.filter((t) => t.id !== deletedId))
        }
      />
    </section>
  );
};

export default DashboardPage;
