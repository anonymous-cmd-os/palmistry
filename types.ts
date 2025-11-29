export interface PalmAnalysis {
  heartLine: string;
  headLine: string;
  lifeLine: string;
  fateLine: string;
  mounts: string;
}

export interface OracleResult {
  zodiacSign: string;
  element: string;
  dateOfBirth: string;
  palmAnalysis: PalmAnalysis;
  personality: string;
  behavior: string;
  strengths: string[];
  challenges: string[];
  loveLife: string;
  career: string;
  spiritualGuidance: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface UserInput {
  dob: string;
  leftHand: File | null;
  rightHand: File | null;
}