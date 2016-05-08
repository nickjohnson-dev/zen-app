import _ from 'lodash';
import notes from 'modules/notes';
import sound from 'modules/sound';
import actionTypes from './action-types';
import { toolTypes } from './constants';
import * as helpers from './helpers';
import selectors from './selectors';

export function changeSynthType(synthType) {
  return (dispatch) => {
    dispatch(setSynthType(synthType));
    dispatch(sound.actions.setSynth(synthType));
  };
}

export function pan(elementRef, e) {
  return (dispatch, getState) => {
    const panStart = selectors.getPanStart(getState());
    helpers.panScrollContainer(elementRef, e, panStart);
  };
}

export function setIsPanning(isPanning) {
  return {
    type: actionTypes.SET_IS_PANNING,
    isPanning,
  };
}

export function setSynthType(synthType) {
  return {
    type: actionTypes.SET_SYNTH_TYPE,
    synthType,
  };
}

export function setToolType(toolType) {
  return (dispatch) => {
    if (_.includes([toolTypes.DRAW, toolTypes.ERASE], toolType)) {
      dispatch(notes.actions.select([]));
    }
    dispatch(setToolTypeInner(toolType));
  };
}

export function setToolTypeInner(toolType) {
  return {
    type: actionTypes.SET_TOOL_TYPE,
    toolType,
  };
}

export function setPanStart(panStart) {
  return {
    type: actionTypes.SET_PAN_START,
    panStart,
  };
}

export function startPanning(elementRef, e) {
  return (dispatch) => {
    const panStart = helpers.getPanStart(elementRef, e);
    dispatch(setIsPanning(true));
    dispatch(setPanStart(panStart));
  };
}

export function stopPanning() {
  return (dispatch) => {
    dispatch(setIsPanning(false));
  };
}