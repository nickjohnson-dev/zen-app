import { gql } from '@apollo/client';

import { Note, Point } from '../../../types';

export interface UpdateNotesResponse {
  updateNotes: {
    notes: Note[];
  };
}

export interface UpdateNotesVariables {
  input: {
    id: number;
    points: Point[];
  };
}

export const UPDATE_NOTES = gql`
  mutation UpdateNotes($input: UpdateNotesInput!) {
    updateNotes(input: $input) {
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
