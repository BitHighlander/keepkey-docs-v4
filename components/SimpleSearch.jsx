import React from 'react';

export default function SimpleSearch() {
  return (
    <div className="p-4 border rounded shadow-sm">
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Search for assets..."
      />
      <p className="mt-2 text-sm text-gray-500">
        Type to search for Bitcoin, Ethereum, etc.
      </p>
    </div>
  );
} 