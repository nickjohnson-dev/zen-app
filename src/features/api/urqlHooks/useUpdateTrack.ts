import { useMutation } from 'urql';

import {
  UPDATE_TRACK,
  UpdateTrackResponse,
  UpdateTrackVariables,
} from '../queries';
import { MutationHook } from './types';

export const useUpdateTrack: MutationHook<
  UpdateTrackResponse,
  UpdateTrackVariables
> = () => useMutation(UPDATE_TRACK);
