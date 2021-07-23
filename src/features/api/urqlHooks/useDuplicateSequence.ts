import { useMutation } from 'urql';

import {
  DUPLICATE_SEQUENCE,
  DuplicateSequenceResponse,
  DuplicateSequenceVariables,
} from '../queries';
import { MutationHook } from './types';

export const useDuplicateSequence: MutationHook<
  DuplicateSequenceResponse,
  DuplicateSequenceVariables
> = () => useMutation(DUPLICATE_SEQUENCE);
