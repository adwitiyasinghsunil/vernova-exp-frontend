import { SUGGESTIONS_POOL } from './constants';

export const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

export const getRandomSuggestions = (count = 3) => {
  const shuffled = [...SUGGESTIONS_POOL].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};