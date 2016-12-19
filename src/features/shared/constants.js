import { range } from 'lodash/fp';

export const NAME = 'shared';

export const defaultBPM = 120;

export const localStorageKey = 'currentSong';

export const minBPM = 60;
export const maxBPM = 400;

export const bpmRange = range(minBPM, maxBPM + 1, 10);

export const octaveRange = [0, 1, 2, 3, 4, 5, 6];

export const synthTypes = {
  PWM: 'pwm',
  SAWTOOTH: 'sawtooth',
  SINE: 'sine',
  SQUARE: 'square',
};

export const toolTypes = {
  DRAW: 'DRAW',
  ERASE: 'ERASE',
  SELECT: 'SELECT',
  MOVE: 'MOVE',
  PAN: 'PAN',
};

export const defaultSynthType = synthTypes.SQUARE;

export const defaultToolType = toolTypes.SELECT;

export const scale = [
  { name: 'B6', y: 0 },
  { name: 'A#6', y: 1 },
  { name: 'A6', y: 2 },
  { name: 'G#6', y: 3 },
  { name: 'G6', y: 4 },
  { name: 'F#6', y: 5 },
  { name: 'F6', y: 6 },
  { name: 'E6', y: 7 },
  { name: 'D#6', y: 8 },
  { name: 'D6', y: 9 },
  { name: 'C#6', y: 10 },
  { name: 'C6', y: 11 },
  { name: 'B5', y: 12 },
  { name: 'A#5', y: 13 },
  { name: 'A5', y: 14 },
  { name: 'G#5', y: 15 },
  { name: 'G5', y: 16 },
  { name: 'F#5', y: 17 },
  { name: 'F5', y: 18 },
  { name: 'E5', y: 19 },
  { name: 'D#5', y: 20 },
  { name: 'D5', y: 21 },
  { name: 'C#5', y: 22 },
  { name: 'C5', y: 23 },
  { name: 'B4', y: 24 },
  { name: 'A#4', y: 25 },
  { name: 'A4', y: 26 },
  { name: 'G#4', y: 27 },
  { name: 'G4', y: 28 },
  { name: 'F#4', y: 29 },
  { name: 'F4', y: 30 },
  { name: 'E4', y: 31 },
  { name: 'D#4', y: 32 },
  { name: 'D4', y: 33 },
  { name: 'C#4', y: 34 },
  { name: 'C4', y: 35 },
  { name: 'B3', y: 36 },
  { name: 'A#3', y: 37 },
  { name: 'A3', y: 38 },
  { name: 'G#3', y: 39 },
  { name: 'G3', y: 40 },
  { name: 'F#3', y: 41 },
  { name: 'F3', y: 42 },
  { name: 'E3', y: 43 },
  { name: 'D#3', y: 44 },
  { name: 'D3', y: 45 },
  { name: 'C#3', y: 46 },
  { name: 'C3', y: 47 },
  { name: 'B2', y: 48 },
  { name: 'A#2', y: 49 },
  { name: 'A2', y: 50 },
  { name: 'G#2', y: 51 },
  { name: 'G2', y: 52 },
  { name: 'F#2', y: 53 },
  { name: 'F2', y: 54 },
  { name: 'E2', y: 55 },
  { name: 'D#2', y: 56 },
  { name: 'D2', y: 57 },
  { name: 'C#2', y: 58 },
  { name: 'C2', y: 59 },
  { name: 'B1', y: 60 },
  { name: 'A#1', y: 61 },
  { name: 'A1', y: 62 },
  { name: 'G#1', y: 63 },
  { name: 'G1', y: 64 },
  { name: 'F#1', y: 65 },
  { name: 'F1', y: 66 },
  { name: 'E1', y: 67 },
  { name: 'D#1', y: 68 },
  { name: 'D1', y: 69 },
  { name: 'C#1', y: 70 },
  { name: 'C1', y: 71 },
  { name: 'B0', y: 72 },
  { name: 'A#0', y: 73 },
  { name: 'A0', y: 74 },
  { name: 'G#0', y: 75 },
  { name: 'G0', y: 76 },
  { name: 'F#0', y: 77 },
  { name: 'F0', y: 78 },
  { name: 'E0', y: 79 },
  { name: 'D#0', y: 80 },
  { name: 'D0', y: 81 },
  { name: 'C#0', y: 82 },
  { name: 'C0', y: 83 },
];
