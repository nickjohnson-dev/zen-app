import { gql } from '@apollo/client';

export interface LogoutResponse {
  logout: {
    success: boolean;
  };
}

export type LogoutVariables = Record<string, never>;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;
