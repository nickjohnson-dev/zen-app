import { useMemo } from 'react';
import { useQuery } from 'urql';

import {
  GET_SEQUENCE,
  GetSequenceResponse,
  GetSequenceVariables,
} from '../queries';
import { QueryHook } from './types';

export const useGetSequence: QueryHook<
  GetSequenceResponse,
  GetSequenceVariables
> = (args) => {
  const context = useMemo(() => ({ additionalTypenames: ['Sequence'] }), []);

  return useQuery({
    context,
    query: GET_SEQUENCE,
    ...args,
  });
};
