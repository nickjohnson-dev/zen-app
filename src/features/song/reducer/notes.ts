import filter from 'lodash/fp/filter';
import map from 'lodash/fp/map';
import omit from 'lodash/fp/omit';
import values from 'lodash/fp/values';
import { createReducer, PayloadAction } from 'redux-starter-kit';
import Dawww from '../../../dawww';
import { Note, Point, Sequence, Song } from '../../../types';
import shared from '../../shared';
import * as actions from '../actions';

const initialState = {};
const octaveDownDelta = { x: 0, y: 12 };
const octaveUpDelta = { x: 0, y: -12 };

export default createReducer<{ [key: string]: Note }, {}>(initialState, {
  [actions.songLoaded.type]: (state, action: PayloadAction<Song>) =>
    action.payload.notes,
  [actions.noteDrawn.type]: (state, action: PayloadAction<Note>) =>
    shared.helpers.setAtIds([action.payload], state),
  [actions.noteErased.type]: (state, action: PayloadAction<Note>) =>
    omit(action.payload.id, state),
  [actions.notesDeleted.type]: (state, action: PayloadAction<Array<Note>>) =>
    omit(map('id', action.payload), state),
  [actions.notesDragged.type]: (state, action: PayloadAction<Array<Note>>) =>
    shared.helpers.setAtIds(action.payload, state),
  [actions.notesDuplicated.type]: (state, action: PayloadAction<Array<Note>>) =>
    shared.helpers.setAtIds(action.payload, state),
  [actions.notesMovedOctaveDown.type]: (
    state,
    action: PayloadAction<Array<Note>>,
  ) =>
    shared.helpers.setAtIds(
      map(Dawww.translateNote(octaveDownDelta), action.payload),
      state,
    ),
  [actions.notesMovedOctaveUp.type]: (
    state,
    action: PayloadAction<Array<Note>>,
  ) =>
    shared.helpers.setAtIds(
      map(Dawww.translateNote(octaveUpDelta), action.payload),
      state,
    ),
  [actions.notesNudged.type]: (
    state,
    action: PayloadAction<{
      delta: Point;
      notes: Array<Note>;
      sequence: Sequence;
    }>,
  ) =>
    shared.helpers.setAtIds(
      map(Dawww.translateNote(action.payload.delta), action.payload.notes),
      state,
    ),
  [actions.notesResized.type]: (state, action: PayloadAction<Array<Note>>) =>
    shared.helpers.setAtIds(action.payload, state),
  [actions.sequenceDuplicated.type]: (
    state,
    action: PayloadAction<{
      duplicatedSequence: Sequence;
      originalSequence: Sequence;
    }>,
  ) => {
    const isInSequence = note =>
      note.sequenceId === action.payload.originalSequence.id;
    const notesInSequence = filter(isInSequence, values(state));
    const duplicatedNotes = Dawww.duplicateNotes(notesInSequence);
    const notesWithNewSequenceId = duplicatedNotes.map(note => ({
      ...note,
      sequenceId: action.payload.duplicatedSequence.id,
    }));

    return shared.helpers.setAtIds(notesWithNewSequenceId, state);
  },
  [shared.actions.routeDashboardLoaded.type]: () => initialState,
});