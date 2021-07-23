import { gql } from '@apollo/client';

export interface DeleteNotesResponse {
  success: boolean;
}

export interface DeleteNotesVariables {
  ids: number[];
}

export const DELETE_NOTES = gql`
  mutation DeleteNotes($ids: [Int!]!) {
    deleteNotes(ids: $ids) {
      success
    }
  }
`;
