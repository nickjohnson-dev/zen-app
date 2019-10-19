import { combineEpics } from 'redux-observable';
import loadSongEpic from './loadSongEpic';
import pausePlaybackEpic from './pausePlaybackEpic';
import setPositionEpic from './setPositionEpic';
import startPlaybackEpic from './startPlaybackEpic';
import stopPlaybackEpic from './stopPlaybackEpic';
import updateSongEpic from './updateSongEpic';

export default combineEpics(
  loadSongEpic,
  pausePlaybackEpic,
  setPositionEpic,
  startPlaybackEpic,
  stopPlaybackEpic,
  updateSongEpic,
);