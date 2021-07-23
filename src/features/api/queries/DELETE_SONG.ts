import { gql } from '@apollo/client';

export type DeleteSongInput = number;

export interface DeleteSongResponse {
  deleteSong: {
    success: boolean;
  };
}

export interface DeleteSongVariables {
  id: number;
}

export const DELETE_SONG = gql`
  mutation DeleteSong($id: Int!) {
    deleteSong(id: $id) {
      success
    }
  }
`;
