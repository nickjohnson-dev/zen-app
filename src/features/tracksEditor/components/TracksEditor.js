import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import find from 'lodash/fp/find';
import isEmpty from 'lodash/fp/isEmpty';
import isNil from 'lodash/fp/isNil';
import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';

import Dawww from '../../../dawww';
import shared from '../../shared';
import TrackEditingModal from './TrackEditingModal';
import TrackList from './TrackList';
import TracksEditorToolbar from './TracksEditorToolbar';

const { Timeline } = shared.components;

const styles = createStyles({
  root: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
  },
});

// export interface TracksEditorProps extends WithStyles<typeof styles> {
//   isLoading?: boolean;
//   isRedoEnabled?: boolean;
//   isStopped?: boolean;
//   isUndoEnabled?: boolean;
//   navigate?: (path: string) => void;
//   onLoad?: (payload: { songId: string }) => void;
//   onPositionSet?: (position: number) => void;
//   onRedo?: () => void;
//   onSequenceAdd?: (newSequence: Sequence) => void;
//   onSequenceDelete?: (sequenceToDelete: SequenceWithNotes) => void;
//   onSequenceDuplicate?: (options: {
//     duplicatedSequence: Sequence,
//     originalSequence: SequenceWithNotes,
//   }) => void;
//   onSequenceEdit?: (sequence: SequenceWithNotes) => void;
//   onSongMeasureCountChange?: (songMeasureCount: number) => void;
//   onTrackAdd?: (options: { sequence: Sequence, track: Track }) => void;
//   onTrackDelete?: (track: TrackWithSequences) => void;
//   onTrackVoiceSet?: (options: {
//     track: TrackWithSequences,
//     voice: string,
//   }) => void;
//   onTrackVolumeSet?: (options: {
//     track: TrackWithSequences,
//     volume: string,
//   }) => void;
//   onUndo?: () => void;
//   position?: number;
//   sequences?: Array<SequenceWithNotes>;
//   song?: Song;
//   songId?: string;
//   songMeasureCount?: number;
//   tracks?: Array<TrackWithSequences>;
// }

function TracksEditor(props) {
  const {
    classes,
    isLoading,
    isRedoEnabled,
    isStopped,
    isUndoEnabled,
    navigate,
    onLoad,
    onPositionSet,
    onRedo,
    onSequenceAdd,
    onSequenceDelete,
    onSequenceDuplicate,
    onSequenceEdit,
    onSongMeasureCountChange,
    onTrackAdd,
    onTrackDelete,
    onTrackVoiceSet,
    onTrackVolumeSet,
    onUndo,
    position,
    sequences,
    songId,
    songMeasureCount,
    tracks,
  } = props;
  const [selectedSequenceId, setSelectedSequenceId] = React.useState('');
  const [selectedTrackId, setSelectedTrackId] = React.useState('');

  const selectedSequence = React.useMemo(
    () => find((s) => s.id === selectedSequenceId, sequences),
    [selectedSequenceId, sequences],
  );

  const selectedTrack = React.useMemo(
    () => find((t) => t.id === selectedTrackId, tracks),
    [selectedTrackId, tracks],
  );

  const handleRedo = React.useCallback(() => {
    if (!isRedoEnabled) return;

    onRedo();
  }, [isRedoEnabled, onRedo]);

  const handleSequenceDelete = React.useCallback(
    (e) => {
      e.preventDefault();

      if (isNil(selectedSequence)) return;

      onSequenceDelete(selectedSequence);
    },
    [onSequenceDelete, selectedSequence],
  );

  const handleSequenceDuplicate = React.useCallback(
    (e) => {
      e.preventDefault();

      if (isEmpty(selectedSequence)) return;

      const duplicatedSequence = Dawww.createSequence(
        selectedSequence.trackId,
        selectedSequence.position,
        selectedSequence.measureCount,
      );

      onSequenceDuplicate({
        originalSequence: selectedSequence,
        duplicatedSequence,
      });

      setSelectedSequenceId(duplicatedSequence.id);
    },
    [onSequenceDuplicate, selectedSequence],
  );

  const handleSequenceOpen = React.useCallback(
    (sequence) => {
      navigate(`sequence/${sequence.id}`);
    },
    [navigate],
  );

  const handleTrackDeselect = React.useCallback(() => {
    setSelectedTrackId('');
  }, []);

  const handleTrackDelete = React.useCallback(
    (track) => {
      onTrackDelete(track);

      handleTrackDeselect();
    },
    [handleTrackDeselect, onTrackDelete],
  );

  const handleTrackListPositionSet = React.useCallback(
    (position) => {
      if (isStopped) return;

      onPositionSet(position);
    },
    [isStopped, onPositionSet],
  );

  const handleTrackListSequenceAdd = React.useCallback(
    (track, position) => {
      const sequence = Dawww.createSequence(track.id, position);

      onSequenceAdd(sequence);
    },
    [onSequenceAdd],
  );

  const handleTrackListSequenceDeselect = React.useCallback(() => {
    setSelectedSequenceId('');
  }, []);

  const handleTrackListSequenceSelect = React.useCallback((sequence) => {
    setSelectedSequenceId(sequence.id);
  }, []);

  const handleTrackListTrackAdd = React.useCallback(() => {
    const track = Dawww.createTrack();
    const sequence = Dawww.createSequence(track.id);

    onTrackAdd({ sequence, track });
  }, [onTrackAdd]);

  const handleTrackSelect = React.useCallback((track) => {
    setSelectedTrackId(track.id);
  }, []);

  const handleUndo = React.useCallback(() => {
    if (!isUndoEnabled) return;

    onUndo();
  }, [isUndoEnabled, onUndo]);

  React.useEffect(() => {
    onLoad({ songId });
  }, [songId, onLoad]);

  return (
    <div className={classes.root}>
      <GlobalHotKeys
        allowChanges={true}
        handlers={{
          DELETE: handleSequenceDelete,
          DUPLICATE: handleSequenceDuplicate,
          REDO: handleRedo,
          UNDO: handleUndo,
        }}
        keyMap={{
          DELETE: ['backspace', 'del'],
          DUPLICATE: ['ctrl+shift+d', 'meta+shift+d'],
          REDO: ['ctrl+alt+z', 'meta+alt+z'],
          UNDO: ['ctrl+z', 'meta+z'],
        }}
      />
      <React.Fragment>
        <TrackList
          isLoading={isLoading}
          onPositionSet={handleTrackListPositionSet}
          onSequenceAdd={handleTrackListSequenceAdd}
          onSequenceEdit={onSequenceEdit}
          onSequenceDeselect={handleTrackListSequenceDeselect}
          onSequenceOpen={handleSequenceOpen}
          onSequenceSelect={handleTrackListSequenceSelect}
          onSongMeasureCountChange={onSongMeasureCountChange}
          onTrackAdd={handleTrackListTrackAdd}
          onTrackStage={handleTrackSelect}
          selectedSequence={selectedSequence}
          songMeasureCount={songMeasureCount}
          tracks={tracks}
        />
        <TracksEditorToolbar
          isRedoEnabled={isRedoEnabled}
          isUndoEnabled={isUndoEnabled}
          onRedo={handleRedo}
          onSequenceDelete={handleSequenceDelete}
          onSequenceDuplicate={handleSequenceDuplicate}
          onSequenceOpen={handleSequenceOpen}
          onUndo={handleUndo}
          selectedSequence={selectedSequence}
        />
        <Timeline isVisible={!isStopped} offset={position * 2 + 16} />
        <TrackEditingModal
          onDelete={handleTrackDelete}
          onDismiss={handleTrackDeselect}
          onVoiceSet={onTrackVoiceSet}
          onVolumeSet={onTrackVolumeSet}
          stagedTrack={selectedTrack}
        />
      </React.Fragment>
    </div>
  );
}

export default React.memo(withStyles(styles)(TracksEditor));
