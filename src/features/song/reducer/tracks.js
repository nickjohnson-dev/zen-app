import omit from 'lodash/fp/omit';
import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

const { setAtIds } = shared.helpers;

export const tracks = createReducer({}, {
  [shared.actions.SONG_LOADED]: (state, action) =>
    action.payload.song.tracks,

  [shared.actions.TRACK_ADDED]: (state, action) =>
    setAtIds([action.payload.track], state),

  [shared.actions.TRACK_DELETED]: (state, action) =>
    omit(action.payload.track.id)(state),

  [shared.actions.TRACK_IS_MUTED_TOGGLED]: (state, action) =>
    shared.helpers.setAtIds([{
      ...action.payload.track,
      isMuted: !action.payload.track.isMuted,
      isSoloing: false,
    }], state),

  [shared.actions.TRACK_IS_SOLOING_TOGGLED]: (state, action) =>
    shared.helpers.setAtIds([{
      ...action.payload.track,
      isSoloing: !action.payload.track.isSoloing,
      isMuted: false,
    }], state),

  [shared.actions.TRACK_VOICE_SET]: (state, action) =>
    shared.helpers.setAtIds([{
      ...action.payload.track,
      voice: action.payload.voice,
    }], state),
});
