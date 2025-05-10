"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchAllDemos,
  addDemo,
  editDemo,
  deleteDemo,
} from "../../features/demo/demoSlice";
import DemoForm from "../../features/demo/DemoForm";
import DemoList from "../../features/demo/DemoList";
import { DemoEntity } from "../../types/demoTypes";

const DemoPage = () => {
  const dispatch = useAppDispatch();
  const { entities, loading, error } = useAppSelector((state) => state.demo);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit" | "delete">("add");
  const [selectedEntity, setSelectedEntity] = useState<DemoEntity | null>(null);

  useEffect(() => {
    dispatch(fetchAllDemos());
  }, [dispatch]);

  const openForm = (
    mode: "add" | "edit" | "delete",
    entity: DemoEntity | null = null
  ) => {
    if ((mode === "edit" || mode === "delete") && !entity?.id) {
      console.error(`${mode} mode requires a valid entity with an ID.`);
      return;
    }
    setFormMode(mode);
    setSelectedEntity(entity);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedEntity(null);
  };

  const handleFormSubmit = (data: DemoEntity) => {
    if (formMode === "add") {
      dispatch(addDemo(data));
    } else if (formMode === "edit") {
      if (data.id) {
        dispatch(editDemo(data));
      } else {
        console.error("Edit mode requires a valid ID.");
      }
    } else if (formMode === "delete") {
      if (data.id) {
        dispatch(deleteDemo(data.id));
      } else {
        console.error("Delete mode requires a valid ID.");
      }
    }
    closeForm();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Demo List</h1>

      <button
        onClick={() => openForm("add")}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Add Demo
      </button>

      <DemoList
        data={entities}
        onEdit={(entity) => openForm("edit", entity)}
        onDelete={(entity) => openForm("delete", entity)}
      />

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <DemoForm
              initialData={selectedEntity || undefined}
              mode={formMode}
              formSubmit={handleFormSubmit}
            />
            <button
              onClick={closeForm}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoPage;
