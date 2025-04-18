import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

// Define Asset type directly since importing it might cause issues
interface Asset {
  name: string;
  symbol: string;
  image: string;
  blockchain: string;
  path?: string;
  _id?: string;
}

// Simple mock data for initial testing to avoid any import errors
const SUPPORTED_ASSETS: Asset[] = [
  { 
    name: "Bitcoin", 
    symbol: "BTC", 
    image: "https://pioneers.dev/coins/bitcoin.png", 
    blockchain: "bitcoin",
    path: "/assets/bitcoin"
  },
  { 
    name: "Ethereum", 
    symbol: "ETH", 
    image: "https://pioneers.dev/coins/ethereum.png", 
    blockchain: "ethereum",
    path: "/assets/ethereum"
  },
  { 
    name: "Litecoin", 
    symbol: "LTC", 
    image: "https://pioneers.dev/coins/litecoin.png", 
    blockchain: "litecoin",
    path: "/assets/litecoin"
  }
];

// Simple search function that doesn't rely on imported service
const searchAssets = async (query: string): Promise<Asset[]> => {
  if (!query) return [];
  
  const normalizedQuery = query.toLowerCase();
  return SUPPORTED_ASSETS.filter(asset => 
    asset.name.toLowerCase().includes(normalizedQuery) || 
    asset.symbol.toLowerCase().includes(normalizedQuery) ||
    asset.blockchain.toLowerCase().includes(normalizedQuery)
  );
};

// Export the component with proper typing
const AssetSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Asset[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Handle clicks outside the search component
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const handleSearch = async () => {
      if (query.length === 0) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        // Simple timeout to simulate async search
        setTimeout(async () => {
          if (!isMounted) return;
          
          const assets = await searchAssets(query);
          
          if (isMounted) {
            setResults(assets);
            setShowResults(true);
            setIsLoading(false);
          }
        }, 300);
      } catch (error) {
        console.error('Error searching assets:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    handleSearch();
    
    return () => {
      isMounted = false;
    };
  }, [query]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleAssetClick = (asset: Asset) => {
    if (asset.path) {
      router.push(asset.path);
    }
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={searchRef}>
      <div className="flex items-center relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
          </svg>
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search for assets (BTC, ETH, Cosmos...)"
          value={query}
          onChange={handleSearchChange}
          onFocus={() => query && setShowResults(true)}
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto">
          <ul className="py-1 divide-y divide-gray-200">
            {results.map((asset, index) => (
              <li 
                key={asset._id || index} 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleAssetClick(asset)}
              >
                <div className="flex items-center px-4 py-2">
                  <img 
                    src={asset.image} 
                    alt={asset.name} 
                    className="h-8 w-8 mr-3" 
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{asset.name}</p>
                    <p className="text-xs text-gray-500">{asset.symbol} • {asset.blockchain}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showResults && query && results.length === 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md">
          <div className="px-4 py-3 text-sm text-gray-700">
            No assets found matching "{query}"
          </div>
        </div>
      )}
    </div>
  );
};

// Make sure to export the component as default
export default AssetSearch; 