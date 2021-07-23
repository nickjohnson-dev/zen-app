import { useMutation } from 'urql';

import {
  DELETE_NOTES,
  DeleteNotesResponse,
  DeleteNotesVariables,
} from '../queries';
import { MutationHook } from './types';

export const useDeleteNotes: MutationHook<
  DeleteNotesResponse,
  DeleteNotesVariables
> = () => useMutation(DELETE_NOTES);
