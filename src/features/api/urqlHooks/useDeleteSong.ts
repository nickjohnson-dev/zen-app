import { useMutation } from 'urql';

import {
  DELETE_SONG,
  DeleteSongResponse,
  DeleteSongVariables,
} from '../queries';
import { MutationHook } from './types';

export const useDeleteSong: MutationHook<
  DeleteSongResponse,
  DeleteSongVariables
> = () => useMutation(DELETE_SONG);
