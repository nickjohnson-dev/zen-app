import { useMutation } from 'urql';

import {
  DUPLICATE_NOTES,
  DuplicateNotesResponse,
  DuplicateNotesVariables,
} from '../queries';
import { MutationHook } from './types';

export const useDuplicateNotes: MutationHook<
  DuplicateNotesResponse,
  DuplicateNotesVariables
> = () => useMutation(DUPLICATE_NOTES);
