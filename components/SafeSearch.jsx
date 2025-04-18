'use client';

import React, { useState, useEffect } from 'react';

export default function SafeSearch() {
  // Start with a clean empty state for server rendering
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Only run client-side code after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // If we're not on the client yet, render a minimal placeholder
  // that matches the server-rendered version
  if (!isClient) {
    return (
      <div className="p-4 border rounded shadow-sm">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Search for assets..."
          disabled
        />
        <p className="mt-2 text-sm text-gray-500">
          Loading search...
        </p>
      </div>
    );
  }

  // Client-side only rendering from here
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-4 border rounded shadow-sm">
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Search for assets..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <p className="mt-2 text-sm text-gray-500">
        {searchQuery 
          ? `Searching for: ${searchQuery}` 
          : 'Type to search for Bitcoin, Ethereum, etc.'}
      </p>
      
      {searchQuery && (
        <div className="mt-4">
          <h4 className="font-medium">Quick links:</h4>
          <ul className="mt-2 space-y-1">
            {searchQuery.toLowerCase().includes('btc') && (
              <li>
                <a href="/assets/bitcoin" className="text-blue-500 hover:underline">
                  Bitcoin (BTC)
                </a>
              </li>
            )}
            {searchQuery.toLowerCase().includes('eth') && (
              <li>
                <a href="/assets/ethereum" className="text-blue-500 hover:underline">
                  Ethereum (ETH)
                </a>
              </li>
            )}
            {searchQuery.toLowerCase().includes('ltc') && (
              <li>
                <a href="/assets/litecoin" className="text-blue-500 hover:underline">
                  Litecoin (LTC)
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
} 