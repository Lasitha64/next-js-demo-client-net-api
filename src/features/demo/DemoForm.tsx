"use client";
import { DemoEntity, DemoFormProps } from "@/types/demoTypes";
import React, { useState, useEffect } from "react";

const DemoForm: React.FC<DemoFormProps> = ({
  initialData,
  mode,
  formSubmit,
}) => {
  const [formData, setFormData] = useState<DemoEntity>({
    id: initialData?.id || undefined,
    uuid: initialData?.uuid || undefined,
    title: initialData?.title || "",
    description: initialData?.description || "",
  });

  const isReadOnly = mode === "delete";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formSubmit(formData);
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">
        {mode === "add" && "Add Demo"}
        {mode === "edit" && "Edit Demo"}
        {mode === "delete" && "Delete Demo"}
      </h2>

      {formData.id && (
        <div className="mb-4">
          <label
            htmlFor="id"
            className="block text-sm font-medium text-gray-700"
          >
            ID
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500"
          />
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          readOnly={isReadOnly}
          className={`mt-1 block w-full px-3 py-2 border ${
            isReadOnly ? "bg-gray-100 text-gray-500" : "border-gray-300"
          } rounded-md shadow-sm`}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          readOnly={isReadOnly}
          className={`mt-1 block w-full px-3 py-2 border ${
            isReadOnly ? "bg-gray-100 text-gray-500" : "border-gray-300"
          } rounded-md shadow-sm`}
        />
      </div>

      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-md text-white ${
          mode === "delete"
            ? "bg-red-600 hover:bg-red-700"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {mode === "add" && "Add"}
        {mode === "edit" && "Save Changes"}
        {mode === "delete" && "Delete"}
      </button>
    </form>
  );
};

export default DemoForm;
