import Client from '@pioneer-platform/pioneer-client';

interface Asset {
  name: string;
  symbol: string;
  image: string;
  blockchain: string;
  description?: string;
  website?: string;
  explorer?: string;
  rank?: number;
  path?: string;
  _id?: string;
  type?: string;
  tags?: string[];
  decimals?: number;
  facts?: string[];
  price?: number;
}

// Pioneer API configuration
const PIONEER_API_SPEC = "https://pioneers.dev/spec/swagger.json";
const DEFAULT_CONFIG = { queryKey: 'key:public', spec: PIONEER_API_SPEC };

class AssetService {
  private static apiClient: any = null;
  private static assetCache: Map<string, Asset> = new Map();
  private static assetsPromise: Promise<Asset[]> | null = null;

  // Initialize the Pioneer API client
  private static async initApiClient() {
    if (!this.apiClient) {
      const Api = new Client(PIONEER_API_SPEC, DEFAULT_CONFIG);
      this.apiClient = await Api.init();
    }
    return this.apiClient;
  }

  // Map API response to our Asset interface
  private static mapApiAssetToAsset(apiAsset: any): Asset {
    // Find the matching path based on blockchain name
    const path = `/assets/${apiAsset.blockchain}`.toLowerCase();
    
    return {
      _id: apiAsset._id,
      name: apiAsset.name || '',
      symbol: apiAsset.symbol || '',
      image: apiAsset.image || '',
      blockchain: apiAsset.blockchain || '',
      description: apiAsset.description || '',
      website: apiAsset.website || '',
      explorer: apiAsset.explorer || '',
      rank: apiAsset.rank || 99999,
      path: path,
      type: apiAsset.type || '',
      tags: apiAsset.tags || [],
      decimals: apiAsset.decimals || 0,
      facts: apiAsset.facts || [],
      price: apiAsset.price || 0
    };
  }

  // Get all supported assets
  static async getAssets(): Promise<Asset[]> {
    try {
      // Use cached promise if available
      if (this.assetsPromise) {
        return this.assetsPromise;
      }

      // Create a new promise for loading assets
      this.assetsPromise = (async () => {
        const api = await this.initApiClient();
        
        // Get assets from the Pioneer API
        const response = await api.ListAssetsPageniate({ limit: 100, skip: 0 });
        
        if (!response || !response.data) {
          console.error('Failed to fetch assets from Pioneer API');
          return [];
        }
        
        // Map the API response to our Asset interface
        const assets = response.data.map(this.mapApiAssetToAsset);
        
        // Cache the assets by ID
        assets.forEach(asset => {
          if (asset._id) {
            this.assetCache.set(asset._id, asset);
          }
        });
        
        return assets;
      })();
      
      return this.assetsPromise;
    } catch (error) {
      console.error('Error fetching assets:', error);
      return [];
    }
  }

  // Search assets by name, symbol, or blockchain
  static async searchAssets(query: string): Promise<Asset[]> {
    if (!query) {
      return [];
    }
    
    try {
      const api = await this.initApiClient();
      
      // Use the Pioneer API's search functionality
      const response = await api.SearchByName(query);
      
      if (!response || !response.data) {
        return [];
      }
      
      // Map the API response to our Asset interface
      return response.data.map(this.mapApiAssetToAsset);
    } catch (error) {
      console.error('Error searching assets:', error);
      return [];
    }
  }

  // Get a specific asset by symbol
  static async getAssetBySymbol(symbol: string): Promise<Asset | undefined> {
    if (!symbol) {
      return undefined;
    }
    
    try {
      const api = await this.initApiClient();
      
      // First check if we already have all assets loaded
      const assets = await this.getAssets();
      const asset = assets.find(
        asset => asset.symbol.toLowerCase() === symbol.toLowerCase()
      );
      
      if (asset) {
        return asset;
      }
      
      // If not found in cache, try direct API call
      const searchResult = await api.SearchByName(symbol);
      
      if (!searchResult || !searchResult.data || searchResult.data.length === 0) {
        return undefined;
      }
      
      // Find the asset with matching symbol
      const matchingAsset = searchResult.data.find(
        (a: any) => a.symbol.toLowerCase() === symbol.toLowerCase()
      );
      
      if (!matchingAsset) {
        return undefined;
      }
      
      return this.mapApiAssetToAsset(matchingAsset);
    } catch (error) {
      console.error('Error fetching asset by symbol:', error);
      return undefined;
    }
  }

  // Get a specific asset by blockchain
  static async getAssetByBlockchain(blockchain: string): Promise<Asset | undefined> {
    if (!blockchain) {
      return undefined;
    }
    
    try {
      const api = await this.initApiClient();
      
      // First check if we already have all assets loaded
      const assets = await this.getAssets();
      const asset = assets.find(
        asset => asset.blockchain.toLowerCase() === blockchain.toLowerCase()
      );
      
      if (asset) {
        return asset;
      }
      
      // If not found in cache, try direct API call
      const searchResult = await api.SearchByName(blockchain);
      
      if (!searchResult || !searchResult.data || searchResult.data.length === 0) {
        return undefined;
      }
      
      // Find the asset with matching blockchain
      const matchingAsset = searchResult.data.find(
        (a: any) => a.blockchain.toLowerCase() === blockchain.toLowerCase()
      );
      
      if (!matchingAsset) {
        return undefined;
      }
      
      return this.mapApiAssetToAsset(matchingAsset);
    } catch (error) {
      console.error('Error fetching asset by blockchain:', error);
      return undefined;
    }
  }

  // Clear any cached data
  static clearCache() {
    this.assetCache.clear();
    this.assetsPromise = null;
  }
}

export type { Asset };
export { AssetService }; 