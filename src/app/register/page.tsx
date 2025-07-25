"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { Particles } from "../ui/Particles";

const RegisterPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  type JwtPayload = {
    userId: string;
    [key: string]: unknown;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        form
      );
      const token: string = res.data.token;

      localStorage.setItem("token", token);
      const decoded = jwtDecode<JwtPayload>(token); // ✅ Typed decode

      console.log("✅ Registered as", decoded.userId);
      router.push("/dashboard");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>; // ✅ Typed error
      console.error(error);
      setError(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 py-10 bg-black/90">
      {/* Particle Background */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />
      <div className="absolute inset-0 bg-[#030412] -z-20" />

      <div className="flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md p-6 border border-white/10 rounded-2xl bg-[#030412] shadow-xl z-10">
        {/* Heading */}
        <div className="flex flex-col items-start w-full gap-3 mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-100">
            Create your account
          </h2>
          <p className="text-sm text-neutral-400">
            Sign up to get started with your task manager.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full">
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-neutral-300"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Krushna Ingale"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-neutral-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-neutral-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Error */}
          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-medium text-white rounded-md bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 transition duration-300 ease-in-out"
          >
            Register
          </button>
        </form>

        {/* Redirect */}
        <div className="w-full mt-6 text-center">
          <p className="text-sm text-neutral-400">
            Already a user?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="font-medium text-indigo-500 hover:text-indigo-600 transition"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
