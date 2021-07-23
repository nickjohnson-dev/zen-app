import { useMutation } from 'urql';

import {
  CREATE_SONG,
  CreateSongResponse,
  CreateSongVariables,
} from '../queries';
import { MutationHook } from './types';

export const useCreateSong: MutationHook<
  CreateSongResponse,
  CreateSongVariables
> = () => useMutation(CREATE_SONG);
