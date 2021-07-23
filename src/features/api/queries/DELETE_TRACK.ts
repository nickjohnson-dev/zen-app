import { gql } from '@apollo/client';

export interface DeleteTrackResponse {
  deleteTrack: {
    success: boolean;
  };
}

export interface DeleteTrackVariables {
  id: number;
}

export const DELETE_TRACK = gql`
  mutation DeleteTrack($id: Int!) {
    deleteTrack(id: $id) {
      success
    }
  }
`;
