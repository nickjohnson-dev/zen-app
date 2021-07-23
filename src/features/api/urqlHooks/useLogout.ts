import { useMutation } from 'urql';

import { LOGOUT, LogoutResponse, LogoutVariables } from '../queries';
import { MutationHook } from './types';

export const useLogout: MutationHook<LogoutResponse, LogoutVariables> = () =>
  useMutation(LOGOUT);
