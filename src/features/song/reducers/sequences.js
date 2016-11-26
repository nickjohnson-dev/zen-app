import _ from 'lodash';
import { combineReducers } from 'redux';
import shared from '../../shared';
import * as actions from '../actions';

const { setAtIds } = shared.helpers;

const dict = (state = {}, action) => {
  switch (action.type) {
    case actions.SEQUENCES_ADDED:
    case actions.SEQUENCES_UPDATED:
      return setAtIds(action.sequences, state);
    case actions.SEQUENCES_DELETED:
      return _.omit(state, action.ids);
    case actions.SEQUENCE_EXTENDED:
      return setAtIds([{
        ...state[action.id],
        measureCount: state[action.id].measureCount + 1,
      }], state);
    case actions.SEQUENCE_NUDGED_LEFT:
      return setAtIds([{
        ...state[action.id],
        position: state[action.id].position === 0
          ? 0
          : state[action.id].position - 1,
      }], state);
    case actions.SEQUENCE_NUDGED_RIGHT:
      return setAtIds([{
        ...state[action.id],
        position: state[action.id].position + 1,
      }], state);
    case actions.SEQUENCE_SHORTENED:
      return setAtIds([{
        ...state[action.id],
        measureCount: state[action.id].measureCount === 1
          ? 1
          : state[action.id].measureCount - 1,
      }], state);
    case actions.SEQUENCES_SET:
      return setAtIds(action.sequences, state);
    case actions.SONG_LOADED:
      return action.song.sequences.dict;
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case actions.SEQUENCES_ADDED:
      return state.concat(_.map(action.sequences, 'id'));
    case actions.SEQUENCES_DELETED:
      return _.difference(state, action.ids);
    case actions.SEQUENCES_SET:
      return _.map(action.sequences, 'id');
    case actions.SONG_LOADED:
      return action.song.sequences.ids;
    default:
      return state;
  }
};

export default combineReducers({
  dict,
  ids,
});