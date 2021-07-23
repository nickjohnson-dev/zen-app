import { useContext } from 'react';

import { ClientContext, ClientContextValue } from '../contexts/ClientContext';

export function useClient(): ClientContextValue {
  return useContext(ClientContext);
}
