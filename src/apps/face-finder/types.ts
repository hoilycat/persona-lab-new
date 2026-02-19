
export interface AnimalResult {
  animalName: string;
  nickname: string;
  reasoning: string;
  similarFeatures: string[];
  personalityTraits: string[];
  matchPercentage: number;
}

export type AppState = 'IDLE' | 'CAMERA' | 'ANALYZING' | 'RESULT';
