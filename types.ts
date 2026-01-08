
export type TeamType = string;

export interface TeamMap {
  [key: string]: string[];
}

export interface ProductMap {
  [key: string]: string;
}

export type FileFormat = '.png' | '.jpg' | '.webp';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}
