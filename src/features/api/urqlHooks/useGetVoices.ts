import { useMemo } from 'react';
import { useQuery } from 'urql';

import { GET_VOICES, GetVoicesResponse, GetVoicesVariables } from '../queries';
import { QueryHook } from './types';

export const useGetVoices: QueryHook<GetVoicesResponse, GetVoicesVariables> = (
  args,
) => {
  const context = useMemo(() => ({ additionalTypenames: ['Voice'] }), []);

  return useQuery({
    context,
    query: GET_VOICES,
    ...args,
  });
};
