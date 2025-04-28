export interface UserProfile {
  address: string;
  twitterHandle: string;
  profileImage?: string;
  reflectionsMinted: number;
  currentStreak: number;
  bonusScore: number;
  totalCareScore: number;
}

export interface Reflection {
  id: string;
  content: string;
  timestamp: number;
  owner: string;
  twitterHandle: string;
}

export interface LeaderboardEntry {
  twitterHandle: string;
  address: string;
  totalCareScore: number;
  currentStreak: number;
  reflectionsMinted: number;
}