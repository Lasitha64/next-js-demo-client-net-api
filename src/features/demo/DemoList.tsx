"use client";
import React from "react";
import { DemoListProps } from "../../types/demoTypes";

const DemoList: React.FC<DemoListProps> = ({ data, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">ID</th>
          <th className="border border-gray-300 px-4 py-2">Title</th>
          <th className="border border-gray-300 px-4 py-2">Description</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entity) => (
          <tr key={entity.id}>
            <td className="border border-gray-300 px-4 py-2">{entity.id}</td>
            <td className="border border-gray-300 px-4 py-2">{entity.title}</td>
            <td className="border border-gray-300 px-4 py-2">
              {entity.description}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <button
                onClick={() => onEdit(entity)}
                className="mr-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(entity)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DemoList;
