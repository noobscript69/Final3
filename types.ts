
export interface BrandArchetype {
  subject: string;
  value: number;
}

export interface BrandStrategy {
  tagline: string;
  bio: string;
  mission: string;
  archetypes: BrandArchetype[];
  strategySteps: {
    title: string;
    description: string;
  }[];
  visualPrompt: string;
}

export interface UserInput {
  name: string;
  industry: string;
  experience: string;
  goals: string;
  tone: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  GENERATING_TEXT = 'GENERATING_TEXT',
  GENERATING_IMAGE = 'GENERATING_IMAGE',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}
