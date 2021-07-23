import { useMemo } from 'react';
import { useQuery } from 'urql';

import { GET_SONG, GetSongResponse, GetSongVariables } from '../queries';
import { QueryHook } from './types';

export const useGetSong: QueryHook<GetSongResponse, GetSongVariables> = (
  args,
) => {
  const context = useMemo(() => ({ additionalTypenames: ['Song'] }), []);

  return useQuery({
    context,
    query: GET_SONG,
    ...args,
  });
};
