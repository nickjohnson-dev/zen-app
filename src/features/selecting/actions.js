import { NAME } from './constants';

export const NEW_POINT_SET = `${NAME}/NEW_POINT_SET`;
export const START_POINT_SET = `${NAME}/START_POINT_SET`;
export const STARTED = `${NAME}/STARTED`;
export const STOPPED = `${NAME}/STOPPED`;
export const UPDATED = `${NAME}/UPDATED`;

export const newPointSet = newPoint => ({
  type: NEW_POINT_SET,
  newPoint,
});

export const started = () => ({
  type: STARTED,
});

export const startPointSet = startPoint => ({
  type: START_POINT_SET,
  startPoint,
});

export const stopped = () => ({
  type: STOPPED,
});

export const updated = () => ({
  type: UPDATED,
});
