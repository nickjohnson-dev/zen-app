import { gql } from '@apollo/client';

export interface DeleteSequenceResponse {
  deleteSequence: {
    success: boolean;
  };
}

export interface DeleteSequenceVariables {
  id: number;
}

export const DELETE_SEQUENCE = gql`
  mutation DeleteSequence($id: Int!) {
    deleteSequence(id: $id) {
      success
    }
  }
`;
