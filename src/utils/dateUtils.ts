export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

export const isConsecutiveDay = (lastReflectionTime: number): boolean => {
  if (!lastReflectionTime) return false;
  
  const lastReflectionDate = new Date(lastReflectionTime);
  const today = new Date();
  
  // Reset time part to compare dates only
  lastReflectionDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  // Get yesterday's date
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Check if last reflection was yesterday
  return lastReflectionDate.getTime() === yesterday.getTime();
};