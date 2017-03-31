import * as actions from '../../actions';
import { sequenceDict as reducer } from '../sequence-dict';

describe('Song sequenceDict reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {};
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCES_ADDED', () => {
    const previous = {
      s1: {
        id: 's1',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
    };
    const expected = {
      s1: {
        id: 's1',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
      s2: {
        id: 's2',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
    };
    const action = {
      type: actions.SEQUENCES_ADDED,
      sequences: [{
        id: 's2',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      }],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCES_DELETED', () => {
    const previous = {
      s1: {
        id: 's1',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
      s2: {
        id: 's2',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
    };
    const expected = {
      s1: {
        id: 's1',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
    };
    const action = {
      type: actions.SEQUENCES_DELETED,
      ids: ['s2'],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCE_EXTENDED', () => {
    const previous = {
      s1: {
        id: 's1',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
    };
    const expected = {
      s1: {
        id: 's1',
        measureCount: 2,
        position: 0,
        trackId: 't1',
      },
    };
    const action = {
      type: actions.SEQUENCE_EXTENDED,
      id: 's1',
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCE_NUDGED_LEFT', () => {
    const previous = {
      s1: {
        id: 's1',
        measureCount: 1,
        position: 1,
        trackId: 't1',
      },
    };
    const expected = {
      s1: {
        id: 's1',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
    };
    const action = {
      type: actions.SEQUENCE_NUDGED_LEFT,
      id: 's1',
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCE_NUDGED_LEFT when position === 0', () => {
    const previous = {
      s1: {
        id: 's1',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
    };
    const expected = {
      s1: {
        id: 's1',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
    };
    const action = {
      type: actions.SEQUENCE_NUDGED_LEFT,
      id: 's1',
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCE_NUDGED_RIGHT', () => {
    const previous = {
      s1: {
        id: 's1',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
    };
    const expected = {
      s1: {
        id: 's1',
        measureCount: 1,
        position: 1,
        trackId: 't1',
      },
    };
    const action = {
      type: actions.SEQUENCE_NUDGED_RIGHT,
      id: 's1',
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCE_SHORTENED', () => {
    const previous = {
      s1: {
        id: 's1',
        measureCount: 2,
        position: 0,
        trackId: 't1',
      },
    };
    const expected = {
      s1: {
        id: 's1',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
    };
    const action = {
      type: actions.SEQUENCE_SHORTENED,
      id: 's1',
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCE_SHORTENED when measureCount === 1', () => {
    const previous = {
      s1: {
        id: 's1',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
    };
    const expected = {
      s1: {
        id: 's1',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
    };
    const action = {
      type: actions.SEQUENCE_SHORTENED,
      id: 's1',
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCES_SET', () => {
    const previous = {};
    const expected = {
      s1: {
        id: 's1',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
    };
    const action = {
      type: actions.SEQUENCES_SET,
      sequences: [{
        id: 's1',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      }],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCES_UPDATED', () => {
    const previous = {
      s1: {
        id: 's1',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
      s2: {
        id: 's2',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
    };
    const expected = {
      s1: {
        id: 's1',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
      s2: {
        id: 's2',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
    };
    const action = {
      type: actions.SEQUENCES_UPDATED,
      sequences: [{
        id: 's2',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      }],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SONG_LOADED', () => {
    const previous = {};
    const expected = {
      s1: {
        id: 's1',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      },
    };
    const action = {
      type: actions.SONG_LOADED,
      song: {
        sequences: {
          dict: {
            s1: {
              id: 's1',
              measureCount: 1,
              position: 0,
              trackId: 't1',
            },
          },
          ids: ['s1'],
        },
      },
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});