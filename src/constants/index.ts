// Chain configuration
export const GOOD_CARE_CHAIN_ID = 741741;
export const GOOD_CARE_CHAIN = {
  chainId: GOOD_CARE_CHAIN_ID,
  rpc: ["https://rpc.goodcare.space"],
  nativeCurrency: {
    name: "GOOD",
    symbol: "GOOD",
    decimals: 18,
  },
  shortName: "goodcare",
  slug: "goodcare",
  testnet: false,
  chain: "GOOD CARE",
};

// NFT Collection contract
export const NFT_COLLECTION_ADDRESS = "0xe91DC034e09f8D7E159C4a9A0bD62503e9E64Ee1";

// CARE Score calculations
export const BASE_REFLECTION_POINTS = 10;
export const STREAK_MULTIPLIER = {
  1: 1, // 1 day streak = 1x multiplier
  7: 1.5, // 7 day streak = 1.5x multiplier
  30: 2, // 30 day streak = 2x multiplier
  90: 3, // 90 day streak = 3x multiplier
};

// Admin password (in a real app, this would be handled securely)
export const ADMIN_ACCESS_CODE = "goodcare2025";