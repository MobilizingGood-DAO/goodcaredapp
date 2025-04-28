import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NFT_COLLECTION_ADDRESS, GOOD_CARE_CHAIN } from "../constants";

// Initialize the ThirdwebSDK
const getSDK = async () => {
  try {
    const sdk = ThirdwebSDK.fromPrivateKey(
      // In a real app, this would be securely stored
      process.env.ADMIN_PRIVATE_KEY || "dummy-key",
      GOOD_CARE_CHAIN
    );
    return sdk;
  } catch (error) {
    console.error("Failed to initialize ThirdwebSDK:", error);
    throw error;
  }
};

// Get the NFT Collection contract
export const getNFTCollection = async () => {
  const sdk = await getSDK();
  return sdk.getContract(NFT_COLLECTION_ADDRESS);
};

// Mint a reflection NFT
export const mintReflection = async (
  to: string,
  content: string,
  twitterHandle: string
) => {
  try {
    const contract = await getNFTCollection();
    
    // Prepare metadata for the NFT
    const metadata = {
      name: `Reflection by ${twitterHandle}`,
      description: content,
      properties: {
        author: twitterHandle,
        timestamp: Date.now(),
        type: "reflection"
      }
    };
    
    // Mint the NFT
    const tx = await contract.erc721.mintTo(to, metadata);
    return tx;
  } catch (error) {
    console.error("Failed to mint reflection:", error);
    throw error;
  }
};

// Get user's minted reflections
export const getUserReflections = async (address: string) => {
  try {
    const contract = await getNFTCollection();
    const nfts = await contract.erc721.getOwned(address);
    
    // Filter and map NFTs to our Reflection type
    return nfts
      .filter(nft => nft.metadata.properties?.type === "reflection")
      .map(nft => ({
        id: nft.metadata.id,
        content: nft.metadata.description || "",
        timestamp: nft.metadata.properties?.timestamp || Date.now(),
        owner: address,
        twitterHandle: nft.metadata.properties?.author || "unknown"
      }));
  } catch (error) {
    console.error("Failed to get user reflections:", error);
    return [];
  }
};