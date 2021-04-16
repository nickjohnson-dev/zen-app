import { useMutation } from '@apollo/client';
import React from 'react';

import * as queries from '../queries';

export default function useDeleteTrack(...args) {
  const [mutation, ...rest] = useMutation(queries.DELETE_TRACK, ...args);

  const wrappedMutation = React.useCallback(
    async ({ songId, track }) => {
      try {
        await mutation({
          optimisticResponse: {
            __typename: 'Mutation',
            deleteTrack: {
              success: true,
            },
          },
          update: (cache, result) => {
            if (!result.data.deleteTrack.success) return;

            const prevData = cache.readQuery<queries.GetSongResponse>({
              query: queries.GET_SONG,
              variables: { id: songId },
            });

            if (!prevData || !prevData.song) return;

            cache.writeQuery({
              query: queries.GET_SONG,
              variables: { id: songId },
              data: {
                song: {
                  ...prevData.song,
                  tracks: prevData.song.tracks.filter((t) => t.id !== track.id),
                },
              },
            });
          },
          variables: {
            id: track.id,
          },
        });
      } catch (e) {
        console.error(e.message);
      }
    },
    [mutation],
  );

  return [wrappedMutation, ...rest];
}