import { useMutation } from 'urql';

import {
  UPDATE_SEQUENCE,
  UpdateSequenceResponse,
  UpdateSequenceVariables,
} from '../queries';
import { MutationHook } from './types';

export const useUpdateSequence: MutationHook<
  UpdateSequenceResponse,
  UpdateSequenceVariables
> = () => useMutation(UPDATE_SEQUENCE);
