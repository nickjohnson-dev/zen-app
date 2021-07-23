import { gql } from '@apollo/client';

import { Song } from '../../../types';

export interface CreateSongVariables {
  input: {
    name: string;
  };
}

export interface CreateSongResponse {
  createSong: {
    song: Pick<Song, 'id' | 'name' | 'updatedAt'>;
  };
}

export const CREATE_SONG = gql`
  mutation CreateSong($input: CreateSongInput!) {
    createSong(input: $input) {
      song {
        id
        name
        updatedAt
      }
    }
  }
`;
