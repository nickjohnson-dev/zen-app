import { createContext } from 'react';

export interface ClientContextValue {
  resetClient: () => void;
}

export const ClientContext = createContext<ClientContextValue>({
  resetClient: () => {},
});
