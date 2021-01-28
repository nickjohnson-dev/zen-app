import { configureStore } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import createReducerManager from './createReducerManager';
import audio from './features/audio';
import song from './features/song';

const epicMiddleware = createEpicMiddleware();

export const reducerManager = createReducerManager();

const store = configureStore({
  middleware: [epicMiddleware],
  reducer: reducerManager.reduce,
});

epicMiddleware.run(combineEpics(audio.epic, song.epic));

export default store;
