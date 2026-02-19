
export type TabType = 'job' | 'ideal';

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    type: 'T' | 'E'; 
  }[];
}

export interface DetailedJobResult {
  job: string;
  era: string;
  trait: string;
  story: string;
  lesson: string;
  emoji: string;
  luckyItem: string;
  color: string;
}

export interface DetailedIdealResult {
  type: 'T' | 'E';
  name: string;
  emoji: string;
  summary: string;
  description: string;
  dateStyle: string;
  caution: string;
  bestMenu: string;
}
