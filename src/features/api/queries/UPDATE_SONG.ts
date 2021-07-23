import { gql } from '@apollo/client';

import { Song } from '../../../types';

export interface UpdateSongResponse {
  updateSong: {
    song: Song;
  };
}

export interface UpdateSongVariables {
  input: {
    bpm?: number;
    id: number;
    measureCount?: number;
    name?: string;
  };
}

export const UPDATE_SONG = gql`
  mutation UpdateSong($input: UpdateSongInput!) {
    updateSong(input: $input) {
      song {
        bpm
        updatedAt
        id
        measureCount
        name
      }
    }
  }
`;
