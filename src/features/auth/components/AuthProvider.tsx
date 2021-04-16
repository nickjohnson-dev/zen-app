import { useMutation, useQuery } from '@apollo/client';
import React from 'react';

import api from '../../api';
import AuthContext from '../contexts/AuthContext';

export default function AuthProvider(props: any) {
  const { data, error, loading, refetch } = useQuery(api.queries.ME);
  const [logout] = useMutation(api.queries.LOGOUT);
  const [expiresAt, setExpiresAt] = React.useState<number>();

  const handleLogout = React.useCallback(async () => {
    await logout();
    setExpiresAt(undefined);
    window.localStorage.removeItem('expiresAt');
  }, [logout, setExpiresAt]);

  const getIsAuthenticated = React.useCallback(
    () => expiresAt && new Date().getTime() / 1000 < expiresAt,
    [expiresAt],
  );

  const handleLogin = React.useCallback(
    (loginResult) => {
      setExpiresAt(loginResult.expiresAt);
      window.localStorage.setItem('expiresAt', loginResult.expiresAt);
      refetch();
    },
    [refetch, setExpiresAt],
  );

  React.useEffect(() => {
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
        loading,
        user: data ? data.me : null,
      }}
      {...props}
    />
  );
}