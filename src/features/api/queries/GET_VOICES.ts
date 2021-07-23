import { gql } from '@apollo/client';

import { Voice } from '../../../types';

export interface GetVoicesResponse {
  voices: Voice[];
}

export type GetVoicesVariables = Record<string, never>;

export const GET_VOICES = gql`
  query GetVoices {
    voices {
      id
      name
      toneOscillatorType
    }
  }
`;
