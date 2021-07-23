import { useMemo } from 'react';
import { useQuery } from 'urql';

import { ME, MeResponse, MeVariables } from '../queries';
import { QueryHook } from './types';

export const useMe: QueryHook<MeResponse, MeVariables> = (args = {}) => {
  const context = useMemo(() => ({ additionalTypenames: ['User'] }), []);

  return useQuery({
    context,
    query: ME,
    ...args,
  });
};
