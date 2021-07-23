import { useMemo } from 'react';
import { useQuery } from 'urql';

import { GET_SONGS, GetSongsResponse, GetSongsVariables } from '../queries';
import { QueryHook } from './types';

export const useGetSongs: QueryHook<GetSongsResponse, GetSongsVariables> = (
  args,
) => {
  const context = useMemo(() => ({ additionalTypenames: ['Song'] }), []);

  return useQuery({
    context,
    query: GET_SONGS,
    ...args,
  });
};
