// src/models.ts
export type LearningHistory = {
  userId: string;
  taskId: string;
  correct: boolean;
  score: string;
  timestamp: string;
  dogState: string;
};

export type Dog = {
  userId: string;
  breed: string;
  size: string;
  color: string;
  state: string;
  skills: string;
  decorations: string;
  lastUpdated: string;
};
