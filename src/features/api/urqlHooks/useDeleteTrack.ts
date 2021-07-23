import { useMutation } from 'urql';

import {
  DELETE_TRACK,
  DeleteTrackResponse,
  DeleteTrackVariables,
} from '../queries';
import { MutationHook } from './types';

export const useDeleteTrack: MutationHook<
  DeleteTrackResponse,
  DeleteTrackVariables
> = () => useMutation(DELETE_TRACK);
