import { UserProfile, Reflection, LeaderboardEntry } from "../types";
import { calculateCareScore } from "../utils/scoreCalculator";
import { isConsecutiveDay } from "../utils/dateUtils";

// This is a mock database for demo purposes
// In a real app, this would be replaced with Firebase, PlanetScale, etc.
let users: UserProfile[] = [];
let reflections: Reflection[] = [];

// Get user profile by address
export const getUserByAddress = (address: string): UserProfile | undefined => {
  return users.find(user => user.address.toLowerCase() === address.toLowerCase());
};

// Get user profile by Twitter handle
export const getUserByTwitterHandle = (handle: string): UserProfile | undefined => {
  return users.find(user => user.twitterHandle.toLowerCase() === handle.toLowerCase());
};

// Create or update user profile
export const saveUserProfile = (
  address: string,
  twitterHandle: string,
  profileImage?: string
): UserProfile => {
  const existingUser = getUserByAddress(address);
  
  if (existingUser) {
    // Update existing user
    existingUser.twitterHandle = twitterHandle;
    if (profileImage) existingUser.profileImage = profileImage;
    return existingUser;
  } else {
    // Create new user
    const newUser: UserProfile = {
      address,
      twitterHandle,
      profileImage,
      reflectionsMinted: 0,
      currentStreak: 0,
      bonusScore: 0,
      totalCareScore: 0
    };
    
    users.push(newUser);
    return newUser;
  }
};

// Save a reflection and update user's CARE score
export const saveReflection = (reflection: Reflection): void => {
  reflections.push(reflection);
  
  const user = getUserByAddress(reflection.owner);
  if (!user) return;
  
  // Get user's previous reflections sorted by timestamp (newest first)
  const userReflections = reflections
    .filter(r => r.owner.toLowerCase() === reflection.owner.toLowerCase())
    .sort((a, b) => b.timestamp - a.timestamp);
  
  // Check if there's more than one reflection to determine streak
  if (userReflections.length > 1) {
    const previousReflection = userReflections[1]; // The second newest reflection
    
    if (isConsecutiveDay(previousReflection.timestamp)) {
      // Increment streak if the reflection was made on a consecutive day
      user.currentStreak += 1;
    } else {
      // Reset streak if the reflection was not made on a consecutive day
      user.currentStreak = 1;
    }
  } else {
    // First reflection, streak is 1
    user.currentStreak = 1;
  }
  
  // Update reflection count
  user.reflectionsMinted = userReflections.length;
  
  // Recalculate total CARE score
  user.totalCareScore = calculateCareScore(
    user.reflectionsMinted,
    user.currentStreak,
    user.bonusScore
  );
};

// Update user's bonus score (admin only)
export const updateBonusScore = (address: string, bonusScore: number): boolean => {
  const user = getUserByAddress(address);
  if (!user) return false;
  
  user.bonusScore = bonusScore;
  
  // Recalculate total CARE score
  user.totalCareScore = calculateCareScore(
    user.reflectionsMinted,
    user.currentStreak,
    user.bonusScore
  );
  
  return true;
};

// Get leaderboard
export const getLeaderboard = (): LeaderboardEntry[] => {
  return users
    .sort((a, b) => b.totalCareScore - a.totalCareScore)
    .map(user => ({
      twitterHandle: user.twitterHandle,
      address: user.address,
      totalCareScore: user.totalCareScore,
      currentStreak: user.currentStreak,
      reflectionsMinted: user.reflectionsMinted
    }));
};

// Remove a user (admin only)
export const removeUser = (address: string): boolean => {
  const initialLength = users.length;
  users = users.filter(user => user.address.toLowerCase() !== address.toLowerCase());
  
  // Also remove all reflections by this user
  reflections = reflections.filter(
    reflection => reflection.owner.toLowerCase() !== address.toLowerCase()
  );
  
  return users.length < initialLength;
};