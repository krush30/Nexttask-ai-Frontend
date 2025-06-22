"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        form
      );
      const token = res.data.token;

      localStorage.setItem("token", token);
      const decoded: any = jwtDecode(token);

      console.log("✅ Registered as", decoded.userId);
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "Registration failed");
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
      <div className="absolute inset-0  -z-20" />

      <div className="flex flex-col items-center justify-center w-full max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-[#030412]  shadow-xl z-10">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-2xl font-semibold text-neutral-800">
            Create your account
          </h2>
          <p className="text-sm text-neutral-500">
            Sign up to get started with your task manager.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-4 py-2 text-sm text-gray-800 bg-white border rounded-md shadow-sm field-input field-input-focus"
              placeholder="Krushna Ingale"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

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
              placeholder="ingalekrushna2030@gmail.com"
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
              autoComplete="new-password"
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
            Register
          </button>
        </form>
        {/* Redirect to Login */}
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
