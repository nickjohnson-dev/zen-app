import {
  Box,
  Button,
  Notice,
  Stack,
  Text,
  TextField,
  useThemeWithDefault,
} from 'aria-ui';
import { FC, MouseEventHandler, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';

import { formatError, urqlHooks } from '../../api';
import { useAuth } from '../../auth';

export type LoginProps = Record<string, never>;

export const Login: FC<LoginProps> = () => {
  const [{ error, fetching }, login] = urqlHooks.useLogin();
  const { getIsAuthenticated, handleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  const theme = useThemeWithDefault();

  const handleEmailChange = useCallback<(value: string) => void>(
    (value) => {
      setEmail(value);
    },
    [setEmail],
  );

  const handlePasswordChange = useCallback<(value: string) => void>(
    (value) => {
      setPassword(value);
    },
    [setPassword],
  );

  const handleSubmit = useCallback<MouseEventHandler<HTMLButtonElement>>(
    async (e) => {
      e.preventDefault();

      try {
        const { data } = await login(
          { email, password },
          { additionalTypenames: ['User'] },
        );

        if (!data) {
          throw new Error('Failed to log in.');
        }

        handleLogin(data.login);
      } catch (e) {
        console.error(e.message);
      }
    },
    [email, handleLogin, login, password],
  );

  return getIsAuthenticated() ? (
    <Redirect to="/" />
  ) : (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box
        backgroundColor="backgroundContrast"
        borderRadius="md"
        padding={6}
        sx={{
          maxWidth: theme.screenSizes.sm,
          width: '100vw',
        }}
      >
        <Stack element="form" onSubmit={handleSubmit} space={8}>
          <Text variant="header">
            {t('Log in to view and manage songs and data.')}
          </Text>
          <Stack space={4}>
            <TextField
              label={t('Email')}
              onValueChange={handleEmailChange}
              placeholder="Enter email"
              type="email"
              value={email}
            />
            <TextField
              label={t('Password')}
              onValueChange={handlePasswordChange}
              placeholder="Enter password"
              type="password"
              value={password}
            />
            {error && (
              <Notice status="error">{formatError(error).message}</Notice>
            )}
          </Stack>
          <Button
            color="brandPrimary"
            isLoading={fetching}
            sx={{ alignSelf: 'flex-end' }}
            text={t('Log in')}
            type="submit"
            variant="contained"
          />
        </Stack>
      </Box>
    </Box>
  );
};
