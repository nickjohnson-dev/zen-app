import { gql } from '@apollo/client';

import { Note } from '../../../types';

export interface DuplicateNotesResponse {
  duplicateNotes: {
    notes: Note[];
  };
}

export interface DuplicateNotesVariables {
  ids: number[];
}

export const DUPLICATE_NOTES = gql`
  mutation DuplicateNotes($ids: [Int!]!) {
    duplicateNotes(ids: $ids) {
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
    }
  }
`;
