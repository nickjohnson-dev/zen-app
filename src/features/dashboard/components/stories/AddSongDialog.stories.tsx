import { Meta, Story } from '@storybook/react';
import { formatISO } from 'date-fns';
import { graphql } from 'msw';

import {
  ClientProvider,
  CreateSongResponse,
  CreateSongVariables,
} from '../../../api';
import { AddSongDialog, AddSongDialogProps } from '../AddSongDialog';

export default {
  component: AddSongDialog,
  title: 'Dashboard/AddSongDialog',
  parameters: {
    layout: 'fullscreen',
    msw: [
      graphql.query('IntrospectionQuery', (req, res, ctx) => res(ctx.data({}))),
      graphql.mutation<CreateSongResponse, CreateSongVariables>(
        'CreateSong',
        (req, res, ctx) => {
          const {
            input: { name },
          } = req.variables;

          if (name === 'Fail') {
            return res.networkError('Failed to connect');
          }

          if (name === 'Same') {
            return res(
              ctx.errors([
                {
                  message:
                    'You already have a song with that name. Please select another.',
                },
              ]),
            );
          }

          const newSong = {
            __typename: 'Song',
            id: 1,
            name,
            updatedAt: formatISO(Date.now()),
          };

          return res(
            ctx.data({
              createSong: {
                message: 'Song was created.',
                song: newSong,
                success: true,
              },
            }),
          );
        },
      ),
    ],
  },
} as Meta;

export const Default: Story<AddSongDialogProps> = (args) => (
  <ClientProvider>
    <AddSongDialog {...args} />
  </ClientProvider>
);

Default.args = {
  isOpen: true,
};
