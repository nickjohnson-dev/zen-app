import _ from 'lodash';
import actionTypes from './actionTypes';
import * as helpers from './helpers';
import selectors from './selectors';

export function deleteNotes(notes) {
  return {
    type: actionTypes.DELETE_NOTES,
    notes,
  };
}

export function drawNote(note) {
  return {
    type: actionTypes.DRAW_NOTE,
    note,
  };
}

export function drag(newPosition) {
  return (dispatch, getState) => {
    const dragEvent = selectors.getDragEvent(getState());
    const offset = helpers.getPositionOffset(dragEvent.startPosition, newPosition);
    dispatch(setDragEvent({
      ...dragEvent,
      offset,
    }));

    dispatch(moveNote(dragEvent.note, newPosition));
  };
}

export function eraseNote(note) {
  return {
    type: actionTypes.ERASE_NOTE,
    note,
  };
}

export function moveNote(note, newPosition) {
  return (dispatch) => {
    dispatch(updateNote({
      ...note,
      position: newPosition,
    }));
    // Calculate new note position.
    // const movedNote = helpers.createNote({
    //   length: '32n',
    //   octave: 3,
    //   pitch: 0,
    //   time: note.time + positionDelta.y,
    // })
    // dispatch(updateNote(note, movedNote));
  };
}

export function selectNotes(notes) {
  return {
    type: actionTypes.SELECT_NOTES,
    notes,
  };
}

export function startDragging(note) {
  return (dispatch) => {
    dispatch(setDragEvent({
      startPosition: note.position,
      note,
    }));
  };
}

export function stopDragging() {
  return (dispatch) => {
    dispatch(setDragEvent(undefined));
  };
}

export function setDragEvent(dragEvent) {
  return {
    type: actionTypes.SET_DRAG_EVENT,
    dragEvent,
  };
}

export function updateNote(note) {
  return {
    type: actionTypes.UPDATE_NOTE,
    note,
  };
}
