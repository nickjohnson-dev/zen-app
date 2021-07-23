import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Meta, Story } from '@storybook/react';
import { compact, first, max, uniqueId } from 'lodash';
import { graphql } from 'msw';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { Sequence, Song, Track } from '../../../../types';
import {
  ClientProvider,
  CreateSequenceResponse,
  CreateSequenceVariables,
  CreateTrackResponse,
  CreateTrackVariables,
  DeleteSequenceResponse,
  DeleteSequenceVariables,
  DeleteTrackResponse,
  DeleteTrackVariables,
  DuplicateSequenceResponse,
  DuplicateSequenceVariables,
  GetSongResponse,
  GetSongVariables,
} from '../../../api';
import { AudioProvider } from '../../../audio';
import { Shell } from '../../../shared';
import { TracksEditor } from '../TracksEditor';

const state = {
  song: {
    bpm: 100,
    createdAt: '2021-01-01',
    id: 100,
    measureCount: 4,
    name: 'Song 1',
    tracks: [
      {
        id: 100,
        isMuted: false,
        isSoloing: false,
        position: 1,
        sequences: [
          {
            id: 100,
            measureCount: 1,
            notes: [],
            position: 0,
            track: {
              id: 100,
            },
          },
          {
            id: 200,
            measureCount: 2,
            notes: [],
            position: 2,
            track: {
              id: 100,
            },
          },
        ],
        song: {
          id: 100,
        },
        voice: {
          id: 100,
          name: 'Sawtooth',
          toneOscillatorType: 'sawtooth',
        },
        volume: 1,
      },
    ],
    updatedAt: '2021-01-01',
    user: {
      id: 100,
    },
  } as Song,
};

export default {
  component: TracksEditor,
  title: 'TracksEditor/TracksEditor',
  parameters: {
    layout: 'fullscreen',
    msw: [
      graphql.query('IntrospectionQuery', (req, res, ctx) => res(ctx.data({}))),
      graphql.mutation<CreateSequenceResponse, CreateSequenceVariables>(
        'CreateSequence',
        (req, res, ctx) => {
          const {
            input: { position, trackId },
          } = req.variables;

          const newSequence: Sequence = {
            id: parseInt(uniqueId()),
            measureCount: 1,
            notes: [],
            position,
            track: {
              id: trackId,
            },
          };

          state.song = {
            ...state.song,
            tracks: state.song.tracks.map((track) =>
              track.id === trackId
                ? {
                    ...track,
                    sequences: [...track.sequences, newSequence],
                  }
                : track,
            ),
          };

          return res(
            ctx.data({
              createSequence: {
                sequence: newSequence,
              },
            }),
          );
        },
      ),
      graphql.mutation<CreateTrackResponse, CreateTrackVariables>(
        'CreateTrack',
        (req, res, ctx) => {
          const {
            input: { songId },
          } = req.variables;

          const prevMaxPosition =
            max(state.song.tracks.map((track) => track.position)) || 0;

          const newTrack: Track = {
            id: parseInt(uniqueId()),
            isMuted: false,
            isSoloing: false,
            position: prevMaxPosition + 1,
            sequences: [],
            song: {
              id: songId,
            },
            voice: {
              id: 100,
              name: 'Sawtooth',
              toneOscillatorType: 'sawtooth',
            },
            volume: 0,
          };

          state.song = {
            ...state.song,
            tracks: [...state.song.tracks, newTrack],
          };

          return res(
            ctx.data({
              createTrack: {
                track: newTrack,
              },
            }),
          );
        },
      ),
      graphql.mutation<DeleteSequenceResponse, DeleteSequenceVariables>(
        'DeleteSequence',
        (req, res, ctx) => {
          const { id } = req.variables;

          state.song = {
            ...state.song,
            tracks: state.song.tracks.map((track) => ({
              ...track,
              sequences: track.sequences.filter(
                (sequence) => sequence.id !== id,
              ),
            })),
          };

          return res(
            ctx.data({
              deleteSequence: {
                success: true,
              },
            }),
          );
        },
      ),
      graphql.mutation<DeleteTrackResponse, DeleteTrackVariables>(
        'DeleteTrack',
        (req, res, ctx) => {
          const { id } = req.variables;

          state.song = {
            ...state.song,
            tracks: state.song.tracks.filter((track) => track.id !== id),
          };

          return res(
            ctx.data({
              deleteTrack: {
                success: true,
              },
            }),
          );
        },
      ),
      graphql.mutation<DuplicateSequenceResponse, DuplicateSequenceVariables>(
        'DuplicateSequence',
        (req, res, ctx) => {
          const { id } = req.variables;

          const existingSequence = first(
            compact(
              state.song.tracks.map((track) =>
                first(track.sequences.filter((sequence) => sequence.id === id)),
              ),
            ),
          );

          if (!existingSequence) {
            return res(
              ctx.errors([
                { message: 'No sequence matching that ID to duplicate' },
              ]),
            );
          }

          const newSequence = {
            ...existingSequence,
            id: parseInt(uniqueId()),
            notes: existingSequence.notes.map((note) => ({
              ...note,
              id: parseInt(uniqueId()),
            })),
          };

          state.song = {
            ...state.song,
            tracks: state.song.tracks.map((track) =>
              track.id === existingSequence.track.id
                ? {
                    ...track,
                    sequences: [...track.sequences, newSequence],
                  }
                : track,
            ),
          };

          return res(
            ctx.data({
              duplicateSequence: {
                sequence: newSequence,
              },
            }),
          );
        },
      ),
      graphql.query<GetSongResponse, GetSongVariables>(
        'GetSong',
        (req, res, ctx) => {
          return res(
            ctx.data({
              song: state.song,
            }),
          );
        },
      ),
    ],
  },
} as Meta;

const mocks: MockedResponse<Record<string, any>>[] = [];

export const Default: Story<any> = (args) => (
  <ClientProvider>
    <RecoilRoot>
      <MockedProvider mocks={mocks}>
        <AudioProvider>
          <MemoryRouter initialEntries={['/1']}>
            <Shell>
              <Switch>
                <Route path="/:songId">
                  <TracksEditor {...args} />
                </Route>
              </Switch>
            </Shell>
          </MemoryRouter>
        </AudioProvider>
      </MockedProvider>
    </RecoilRoot>
  </ClientProvider>
);
