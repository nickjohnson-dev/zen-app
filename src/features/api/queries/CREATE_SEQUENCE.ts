import { gql } from '@apollo/client';

import { Sequence } from '../../../types';

export interface CreateSequenceResponse {
  createSequence: {
    sequence: Sequence;
  };
}

export interface CreateSequenceVariables {
  input: {
    position: number;
    trackId: number;
  };
}

export const CREATE_SEQUENCE = gql`
  mutation CreateSequence($input: CreateSequenceInput!) {
    createSequence(input: $input) {
      sequence {
        id
        measureCount
        notes {
          id
          points {
            x
            y
          }
          sequence {
            id
          }
        }
        position
        track {
          id
        }
      }
    }
  }
`;
