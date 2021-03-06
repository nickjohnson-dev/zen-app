import * as actions from '../../actions';
import { DawwwEffects } from '../../types';
import { handleNotePlay } from './handleNotePlay';
import { handlePartStepTriggered } from './handlePartStepTriggered';
import { handleReleaseAllRequested } from './handleReleaseAllRequested';
import { handleTrackVoiceEdit } from './handleTrackVoiceEdit';

export const instrumentsEffects: DawwwEffects = (getState, action, shared) => {
  switch (action.type) {
    case actions.NOTE_PLAYED:
      handleNotePlay(getState, action, shared);
      break;
    case actions.PART_STEP_TRIGGERED:
      handlePartStepTriggered(getState, action, shared);
      break;
    case actions.RELEASE_ALL_REQUESTED:
      handleReleaseAllRequested(getState, action, shared);
      break;
    case actions.TRACK_VOICE_EDITED:
      handleTrackVoiceEdit(getState, action, shared);
      break;
    default:
  }
};
