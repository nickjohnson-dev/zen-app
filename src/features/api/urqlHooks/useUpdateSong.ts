import { useMutation } from 'urql';

import {
  UPDATE_SONG,
  UpdateSongResponse,
  UpdateSongVariables,
} from '../queries';
import { MutationHook } from './types';

export const useUpdateSong: MutationHook<
  UpdateSongResponse,
  UpdateSongVariables
> = () => useMutation(UPDATE_SONG);
