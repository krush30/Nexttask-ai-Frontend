"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { Particles } from "../ui/Particles";

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        form
      );
      const token = res.data.token;

      localStorage.setItem("token", token);
      type JwtPayload = { userId: string; [key: string]: unknown };
      const decoded = jwtDecode<JwtPayload>(token);

      console.log("✅ Logged in as", decoded.userId);
      router.push("/dashboard");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      console.error(error);
      setError(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen px-4 section-spacing">
      {/* Particle Background */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      <div className="absolute inset-0 -z-20" />

      <div className="flex flex-col items-center justify-center w-full max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-[#030412] shadow-xl z-10">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-2xl font-semibold text-neutral-800">
            Welcome back
          </h2>
          <p className="text-sm text-neutral-500">
            Log in to manage your tasks.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-4 py-2 text-sm text-gray-800 bg-white border rounded-md shadow-sm field-input field-input-focus"
              placeholder="you@example.com"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full px-4 py-2 text-sm text-gray-800 bg-white border rounded-md shadow-sm field-input field-input-focus"
              placeholder="••••••••"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full px-4 py-3 text-lg text-white rounded-md cursor-pointer bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
        {/* Redirect to Login */}
        <div className="w-full mt-6 text-center">
          <p className="text-sm text-neutral-400">
            Don&#39;t have a account?{" "}
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="font-medium text-indigo-500 hover:text-indigo-600 transition"
            >
              Register!
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
