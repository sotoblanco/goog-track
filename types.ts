
export enum TaskDifficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
  SAVAGE = 'Savage',
}

export interface Task {
  id: string;
  description: string;
  difficulty: TaskDifficulty;
  completed: boolean;
  category: string;
}

export interface DailyScore {
  date: string;
  score: number;
  tasksCompleted: number;
}

export interface CategoryScore {
  category: string;
  score: number;
  tasksCompleted: number;
}
