import { useMutation } from 'urql';

import { LOGIN, LoginResponse, LoginVariables } from '../queries';
import { MutationHook } from './types';

export const useLogin: MutationHook<LoginResponse, LoginVariables> = () =>
  useMutation(LOGIN);
