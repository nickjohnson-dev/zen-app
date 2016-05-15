import actionTypes from './action-types';

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case actionTypes.SET_IS_PANNING:
      return {
        ...state,
        isPanning: action.isPanning,
      };
    case actionTypes.SET_START_POSITION:
      return {
        ...state,
        startPosition: action.startPosition,
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    isPanning: false,
    startPosition: undefined,
  };
}
