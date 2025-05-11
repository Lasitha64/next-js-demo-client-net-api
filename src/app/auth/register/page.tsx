"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";

import { UserRegisterRequest } from "@/types/authTypes";
import { registerUser } from "@/features/Auth/authSlice";
import { useAppDispatch } from "@/store";

const RegisterPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<UserRegisterRequest>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">Register</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-black"
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="text-gray-700 mt-1 block w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-black"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="text-gray-700 mt-1 block w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-black"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="text-gray-700 mt-1 block w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-black"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="text-gray-700 mt-1 block w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => router.push(ROUTES.login)}
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
