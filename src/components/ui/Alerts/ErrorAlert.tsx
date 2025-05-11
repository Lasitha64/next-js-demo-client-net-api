import React from "react";

interface ErrorAlertProps {
  message: string | null;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="w-full max-w-sm mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg"
      role="alert"
    >
      {message}
    </div>
  );
};

export default ErrorAlert;