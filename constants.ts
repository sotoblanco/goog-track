import { TaskDifficulty } from './types';

export const DIFFICULTY_POINTS: Record<TaskDifficulty, number> = {
  [TaskDifficulty.EASY]: 10,
  [TaskDifficulty.MEDIUM]: 30,
  [TaskDifficulty.HARD]: 50,
  [TaskDifficulty.SAVAGE]: 100,
};

export const CATEGORY_COLOR_PALETTE: { bg: string; text: string }[] = [
  { bg: 'bg-red-900/50', text: 'text-red-400' },
  { bg: 'bg-blue-900/50', text: 'text-blue-400' },
  { bg: 'bg-yellow-900/50', text: 'text-yellow-400' },
  { bg: 'bg-green-900/50', text: 'text-green-400' },
  { bg: 'bg-purple-900/50', text: 'text-purple-400' },
  { bg: 'bg-indigo-900/50', text: 'text-indigo-400' },
  { bg: 'bg-pink-900/50', text: 'text-pink-400' },
  { bg: 'bg-teal-900/50', text: 'text-teal-400' },
];

const stringToHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

export const getCategoryColor = (category: string): { bg: string; text: string } => {
  if (!category) {
    return { bg: 'bg-gray-700', text: 'text-gray-300' };
  }
  const hash = stringToHash(category);
  return CATEGORY_COLOR_PALETTE[hash % CATEGORY_COLOR_PALETTE.length];
};
