import { devtoolsExchange } from '@urql/devtools';
import { merge } from 'lodash';
import { FC, memo, ReactNode, useCallback, useMemo, useState } from 'react';
import {
  Client,
  ClientOptions,
  createClient as createUrqlClient,
  defaultExchanges,
  Provider,
} from 'urql';

import { ClientContext } from '../contexts/ClientContext';

const createClient = (clientOptions) =>
  createUrqlClient(
    merge(
      {
        url: process.env.REACT_APP_API_URI || '',
        exchanges: [devtoolsExchange, ...defaultExchanges],
      },
      clientOptions,
    ),
  );

export interface ClientProviderProps {
  children: ReactNode;
  clientOptions?: Partial<ClientOptions>;
}

export const ClientProvider: FC<ClientProviderProps> = memo((props) => {
  const { children, clientOptions } = props;
  const [client, setClient] = useState<Client>(createClient(clientOptions));

  const handleResetClient = useCallback(() => {
    setClient(createClient(clientOptions));
  }, [clientOptions]);

  const value = useMemo(
    () => ({
      resetClient: handleResetClient,
    }),
    [handleResetClient],
  );

  return (
    <ClientContext.Provider value={value}>
      <Provider value={client}>{children}</Provider>
    </ClientContext.Provider>
  );
});
