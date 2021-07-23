import { useMutation } from 'urql';

import {
  CREATE_SEQUENCE,
  CreateSequenceResponse,
  CreateSequenceVariables,
} from '../queries';
import { MutationHook } from './types';

export const useCreateSequence: MutationHook<
  CreateSequenceResponse,
  CreateSequenceVariables
> = () => useMutation(CREATE_SEQUENCE);
