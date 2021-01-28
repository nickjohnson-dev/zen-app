import { createReducer } from '@reduxjs/toolkit';

import * as actions from '../actions';

const initialState = 1;

export default createReducer(initialState, {
  [actions.measureCountSet.type]: (state, action) => action.payload,
  [actions.songLoaded.type]: (state, action) => action.payload.measureCount,
});
