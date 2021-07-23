import { Meta, Story } from '@storybook/react';
import { graphql } from 'msw';
import { FC, ProviderProps, useCallback } from 'react';
import { MemoryRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import { ClientProvider, LoginResponse, LoginVariables } from '../../../api';
import {
  AuthContext,
  AuthContextValue,
} from '../../../auth/contexts/AuthContext';
import { Shell } from '../../../shared';
import { Login } from '../Login';
import { PrivateRoute } from '../PrivateRoute';

const MockAuthProvider: FC<
  Partial<ProviderProps<AuthContextValue>> & {
    valueOverrides?: Partial<AuthContextValue>;
  }
> = ({ valueOverrides = {}, ...rest }) => (
  <AuthContext.Provider
    value={{
      getIsAuthenticated: () => false,
      handleLogin: () => {},
      loading: false,
      logout: () => {},
      user: undefined,
      ...valueOverrides,
    }}
    {...rest}
  />
);

export default {
  component: Login,
  title: 'App/Login',
  argTypes: {
    mockIsAuthenticated: {
      control: { type: 'boolean' },
    },
    mockHandleLogin: {
      action: 'handleLogin',
    },
  },
  parameters: {
    layout: 'fullscreen',
    msw: [
      graphql.query('IntrospectionQuery', (req, res, ctx) => res(ctx.data({}))),
      graphql.mutation<LoginResponse, LoginVariables>(
        'Login',
        (req, res, ctx) => {
          const { email, password } = req.variables;

          if (email !== 'user@ariaapp.io' || password !== 'password') {
            return res(
              ctx.errors([{ message: 'The email or password was incorrect.' }]),
            );
          }

          return res(
            ctx.data({
              login: {
                expiresAt: 9999999999,
                success: true,
              },
            }),
          );
        },
      ),
    ],
  },
} as Meta;

interface LoginArgs {
  mockIsAuthenticated: boolean;
  mockHandleLogin: (loginResult: { expiresAt: number }) => void;
}

export const Default: Story<LoginArgs> = ({
  mockIsAuthenticated,
  mockHandleLogin,
  ...rest
}) => {
  const getIsAuthenticated = useCallback(
    () => mockIsAuthenticated,
    [mockIsAuthenticated],
  );

  return (
    <ClientProvider>
      <MockAuthProvider
        valueOverrides={{
          getIsAuthenticated,
          handleLogin: mockHandleLogin,
        }}
      >
        <MemoryRouter initialEntries={['/login']}>
          <Shell>
            <Switch>
              <Route path="/login">{<Login {...rest} />}</Route>
              <PrivateRoute path="/">Logged In!</PrivateRoute>
            </Switch>
          </Shell>
        </MemoryRouter>
      </MockAuthProvider>
    </ClientProvider>
  );
};

Default.args = {
  mockIsAuthenticated: false,
};
