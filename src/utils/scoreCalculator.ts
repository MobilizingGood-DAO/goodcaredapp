import { STREAK_MULTIPLIER, BASE_REFLECTION_POINTS } from "../constants";

export const calculateCareScore = (
  reflectionsMinted: number,
  currentStreak: number,
  bonusScore: number
): number => {
  // Determine the multiplier based on streak
  let multiplier = 1;
  
  if (currentStreak >= 90) {
    multiplier = STREAK_MULTIPLIER[90];
  } else if (currentStreak >= 30) {
    multiplier = STREAK_MULTIPLIER[30];
  } else if (currentStreak >= 7) {
    multiplier = STREAK_MULTIPLIER[7];
  } else {
    multiplier = STREAK_MULTIPLIER[1];
  }
  
  // Calculate total score: (reflections * base points * multiplier) + bonus
  const score = Math.floor(reflectionsMinted * BASE_REFLECTION_POINTS * multiplier) + bonusScore;
  
  return score;
};

export const getStreakEmoji = (streak: number): string => {
  if (streak >= 90) return "🔥🔥🔥";
  if (streak >= 30) return "🔥🔥";
  if (streak >= 7) return "🔥";
  return "";
};