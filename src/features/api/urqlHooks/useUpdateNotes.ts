import { useMutation } from 'urql';

import {
  UPDATE_NOTES,
  UpdateNotesResponse,
  UpdateNotesVariables,
} from '../queries';
import { MutationHook } from './types';

export const useUpdateNotes: MutationHook<
  UpdateNotesResponse,
  UpdateNotesVariables
> = () => useMutation(UPDATE_NOTES);
