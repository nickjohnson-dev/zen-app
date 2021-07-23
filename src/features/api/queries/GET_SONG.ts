import { gql } from '@apollo/client';

import { Song } from '../../../types';

export interface GetSongResponse {
  song: Song;
}

export interface GetSongVariables {
  id: number;
}

export const GET_SONG = gql`
  query GetSong($id: Int!) {
    song(id: $id) {
      bpm
      createdAt
      id
      measureCount
      name
      tracks {
        id
        position
        sequences {
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
        voice {
          id
          name
          toneOscillatorType
        }
        volume
      }
      updatedAt
      user {
        id
      }
    }
  }
`;
