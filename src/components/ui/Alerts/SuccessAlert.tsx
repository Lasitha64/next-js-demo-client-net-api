import React from "react";

interface SuccessProps {
  message: string | null;
}

const SuccessAlert: React.FC<SuccessProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="w-full max-w-sm mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg"
      role="alert"
    >
      {message}
    </div>
  );
};

export default SuccessAlert;
