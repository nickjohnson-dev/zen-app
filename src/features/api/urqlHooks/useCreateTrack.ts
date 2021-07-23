import { useMutation } from 'urql';

import {
  CREATE_TRACK,
  CreateTrackResponse,
  CreateTrackVariables,
} from '../queries';
import { MutationHook } from './types';

export const useCreateTrack: MutationHook<
  CreateTrackResponse,
  CreateTrackVariables
> = () => useMutation(CREATE_TRACK);
