import _ from 'lodash';
import Tone from 'tone';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import playing from 'ducks/playing';
import song from 'ducks/song';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as constants from './constants';
import * as effects from './effects';
import * as helpers from './helpers';
import * as selectors from './selectors';

const { STARTED } = constants.playbackStates;

function* initialize() {
  yield* updateSequences();
  yield* loopSong();
}

function* loopSequence() {
  const { measureCount, position } = yield select(song.selectors.getActiveSequence);
  const start = helpers.measuresToSeconds(position);
  const end = helpers.measuresToSeconds(position + measureCount);
  yield put(actions.setStartPoint(`+${start}`));
  Tone.Transport.setLoopPoints(start, end);
  Tone.Transport.loop = true;
}

function* loopSong() {
  const songMeasureCount = yield select(song.selectors.getMeasureCount);
  const end = helpers.measuresToSeconds(songMeasureCount);
  yield put(actions.setStartPoint(0));
  Tone.Transport.setLoopPoints(0, end);
  Tone.Transport.loop = true;
}

function* pause() {
  if (Tone.Transport.state !== 'paused') {
    yield call(() => {
      Tone.Transport.pause();
    });

    yield put(playing.actions.releaseAll());
  }
}

function* play() {
  if (Tone.Transport.state === 'stopped') {
    const startPoint = yield select(selectors.getStartPoint);
    yield call(() => {
      Tone.Transport.start(null, startPoint);
    });
  }

  if (Tone.Transport.state === 'paused') {
    yield call(() => {
      Tone.Transport.start();
    });
  }
}

function* sequenceStep(action) {
  const { sequence, step, time } = action.payload;
  const activeSequenceId = yield select(song.selectors.getActiveSequenceId);
  const notes = yield select(song.selectors.getNotesBySequenceId(sequence.id));
  const notesAtStep = _(notes)
    .filter(note => _.first(note.points).x === step)
    .uniqBy(note => _.first(note.points).y)
    .value();

  for (let i = 0; i < notesAtStep.length; i++) {
    const note = notesAtStep[i];
    yield put(playing.actions.playNote({
      channelId: sequence.trackId,
      note,
      time,
    }));
  }

  if (activeSequenceId !== sequence.id) return;

  yield put(actions.setPosition(step));
}

function* setBPM(action) {
  yield call(() => {
    Tone.Transport.bpm.value = action.bpm;
  });
}

function* stop() {
  if (Tone.Transport.state !== 'stopped') {
    yield call(() => {
      Tone.Transport.stop();
    });

    yield put(playing.actions.releaseAll());
  }
}

function* togglePlayPause() {
  const playbackState = yield select(selectors.getPlaybackState);
  if (playbackState === STARTED) {
    yield* play();
  } else {
    yield* pause();
  }
}

function* updateSequences() {
  const sequences = yield select(selectors.getSequences);

  sequences.forEach(s => s.dispose());

  yield put(effects.createSequences());
}

export default function* saga() {
  yield [
    takeEvery(actionTypes.PLAY, play),
    takeEvery(actionTypes.PAUSE, pause),
    takeEvery(actionTypes.SEQUENCE_STEP, sequenceStep),
    takeEvery(actionTypes.STOP, stop),
    takeEvery(actionTypes.TOGGLE_PLAY_PAUSE, togglePlayPause),
    takeEvery(song.actionTypes.CLOSE_SEQUENCE, loopSong),
    takeEvery(song.actionTypes.DECREMENT_MEASURE_COUNT, loopSong),
    takeEvery(song.actionTypes.INCREMENT_MEASURE_COUNT, loopSong),
    takeEvery(song.actionTypes.LOAD_SONG, initialize),
    takeEvery(song.actionTypes.OPEN_SEQUENCE, loopSequence),
    takeEvery(song.actionTypes.SET_BPM, setBPM),
  ];
}