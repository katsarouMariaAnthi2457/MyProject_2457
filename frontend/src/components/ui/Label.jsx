import React from 'react';

export function Label({ htmlFor, children, className = '' }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-900 ${className}`}
    >
      {children}
    </label>
  );
}
