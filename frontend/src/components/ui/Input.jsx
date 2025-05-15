// input.jsx
import React from "react";

export function Input(props) {
  return (
    <input
      className="rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
      {...props}
    />
  );
}
