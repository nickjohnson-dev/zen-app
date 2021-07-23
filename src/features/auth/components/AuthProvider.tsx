import { FC, ProviderProps, useCallback, useEffect, useState } from 'react';

import { urqlHooks, useClient } from '../../api';
import { AuthContext, AuthContextValue } from '../contexts/AuthContext';

export const AuthProvider: FC<Partial<ProviderProps<AuthContextValue>>> = (
  props,
) => {
  const { resetClient } = useClient();
  const [{ data, error, fetching }] = urqlHooks.useMe();
  const [, logout] = urqlHooks.useLogout();
  const [expiresAt, setExpiresAt] = useState<number>();
  console.log('AuthProvider rerender');
  const handleLogout = useCallback(async () => {
    await logout();
    setExpiresAt(undefined);
    window.localStorage.removeItem('expiresAt');
    resetClient();
  }, [logout, resetClient, setExpiresAt]);

  const getIsAuthenticated = useCallback(
    () => !!expiresAt && new Date().getTime() / 1000 < expiresAt,
    [expiresAt],
  );

  const handleLogin = useCallback(
    (loginResult) => {
      setExpiresAt(loginResult.expiresAt);
      window.localStorage.setItem('expiresAt', loginResult.expiresAt);
    },
    [setExpiresAt],
  );

  useEffect(() => {
    const expiresAtStr = window.localStorage.getItem('expiresAt');
    setExpiresAt(expiresAtStr ? parseInt(expiresAtStr) : undefined);
  }, [setExpiresAt]);

  return (
    <AuthContext.Provider
      value={{
        error,
        getIsAuthenticated,
        handleLogin,
        logout: handleLogout,
        loading: fetching,
        user: data?.me,
      }}
      {...props}
    />
  );
};
