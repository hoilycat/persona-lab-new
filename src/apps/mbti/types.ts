
export type MBTIType = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface Question {
  id: number;
  text: string;
  category: 'EI' | 'SN' | 'TF' | 'JP';
  options: {
    text: string;
    type: MBTIType;
  }[];
}

export interface ResultContent {
  title: string;
  description: string;
  traits: string[];
  imageUrl: string;
  matching: string;
  themeColor: string;
}

export type ResultMap = {
  [key: string]: ResultContent;
};

export type AppStep = 'START' | 'QUIZ' | 'RESULT';
