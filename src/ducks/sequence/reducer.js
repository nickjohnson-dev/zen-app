import notes from 'ducks/notes';
import shared from 'ducks/shared';
import actionTypes from './action-types';

const { defaultSynthType, defaultToolType } = shared.constants;
const { getScale } = notes.helpers;

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case actionTypes.SET_MEASURE_COUNT:
      return {
        ...state,
        measureCount: action.measureCount,
      };
    case actionTypes.SET_MOUSE_POSITION:
      return {
        ...state,
        mousePoint: action.mousePoint,
      };
    case actionTypes.SET_SCROLL_LEFT:
      return {
        ...state,
        scrollLeft: action.scrollLeft,
      };
    case actionTypes.SET_SCROLL_TOP:
      return {
        ...state,
        scrollTop: action.scrollTop,
      };
    case actionTypes.SET_SYNTH_TYPE:
      return {
        ...state,
        synthType: action.synthType,
      };
    case actionTypes.SET_TOOL_TYPE:
      return {
        ...state,
        previousToolType: state.toolType,
        toolType: action.toolType,
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    id: 0,
    measureCount: 1,
    mousePoint: undefined,
    previousToolType: undefined,
    scale: getScale(),
    scrollLeft: 0,
    scrollTop: 0,
    synthType: defaultSynthType,
    toolType: defaultToolType,
  };
}