import { useMutation } from 'urql';

import {
  DELETE_SEQUENCE,
  DeleteSequenceResponse,
  DeleteSequenceVariables,
} from '../queries';
import { MutationHook } from './types';

export const useDeleteSequence: MutationHook<
  DeleteSequenceResponse,
  DeleteSequenceVariables
> = () => useMutation(DELETE_SEQUENCE);
