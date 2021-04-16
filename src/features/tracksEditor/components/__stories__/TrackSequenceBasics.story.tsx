import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';
import React from 'react';

import shared from '../../../shared';
import TrackSequence from '../TrackSequence';

const { Shell } = shared.components;

export const TrackSequenceBasics = () => (
  <Shell
    style={{
      padding: 16,
    }}
  >
    <TrackSequence
      isSelected={boolean('isSelected', false)}
      onOpen={action('onOpen')}
      onSelect={action('onSelect')}
      sequence={{
        id: '0',
        measureCount: number('sequence.measureCount', 1),
        notes: [
          {
            id: '0',
            points: [
              { x: 2, y: 10 },
              { x: 3, y: 10 },
            ],
            sequenceId: '0',
          },
          {
            id: '1',
            points: [
              { x: 4, y: 14 },
              { x: 5, y: 14 },
            ],
            sequenceId: '0',
          },
        ],
        position: 0,
        trackId: '0',
      }}
    />
  </Shell>
);