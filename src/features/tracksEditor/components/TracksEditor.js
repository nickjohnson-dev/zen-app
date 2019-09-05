import Dawww from 'dawww';
import find from 'lodash/fp/find';
import isEmpty from 'lodash/fp/isEmpty';
import isNil from 'lodash/fp/isNil';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import shared from '../../shared';
import TrackList from './TrackList';
import TrackEditingModal from './TrackEditingModal';
import TracksEditorToolbar from './TracksEditorToolbar';

const { Timeline } = shared.components;

const styles = {
  root: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
  },
};

class TracksEditor extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object,
    isLoading: PropTypes.bool,
    isRedoEnabled: PropTypes.bool,
    isStopped: PropTypes.bool,
    isUndoEnabled: PropTypes.bool,
    onLoad: PropTypes.func,
    onPositionSet: PropTypes.func,
    onRedo: PropTypes.func,
    onSequenceAdd: PropTypes.func,
    onSequenceDelete: PropTypes.func,
    onSequenceDuplicate: PropTypes.func,
    onSequenceEdit: PropTypes.func,
    onSongMeasureCountChange: PropTypes.func,
    onTrackAdd: PropTypes.func,
    onTrackDelete: PropTypes.func,
    onTrackIsMutedToggle: PropTypes.func,
    onTrackIsSoloingToggle: PropTypes.func,
    onTrackVoiceSet: PropTypes.func,
    onTrackVolumeSet: PropTypes.func,
    onUndo: PropTypes.func,
    position: PropTypes.number,
    sequences: PropTypes.arrayOf(PropTypes.object),
    song: PropTypes.object,
    songMeasureCount: PropTypes.number,
    tracks: PropTypes.arrayOf(PropTypes.object),
  };

  state = {
    selectedSequenceId: '',
    selectedTrackId: '',
  };

  componentDidMount() {
    this.props.onLoad(this.props.match.params.songId);
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <GlobalHotKeys
          handlers={{
            DELETE: this.deleteSelectedSequence,
            DUPLICATE: this.duplicateSelectedSequence,
            REDO: this.redo,
            UNDO: this.undo,
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
            isLoading={this.props.isLoading}
            onPositionSet={this.handleTrackListPositionSet}
            onSequenceAdd={this.handleTrackListSequenceAdd}
            onSequenceDelete={this.props.onSequenceDelete}
            onSequenceEdit={this.props.onSequenceEdit}
            onSequenceDeselect={this.handleTrackListSequenceDeselect}
            onSequenceOpen={this.openSequence}
            onSequenceSelect={this.handleTrackListSequenceSelect}
            onSongMeasureCountChange={this.props.onSongMeasureCountChange}
            onTrackAdd={this.handleTrackListTrackAdd}
            onTrackIsMutedToggle={this.props.onTrackIsMutedToggle}
            onTrackIsSoloingToggle={this.props.onTrackIsSoloingToggle}
            onTrackStage={this.selectTrack}
            selectedSequence={this.getSelectedSequence()}
            songMeasureCount={this.props.songMeasureCount}
            tracks={this.props.tracks}
          />
          <TracksEditorToolbar
            isRedoEnabled={this.props.isRedoEnabled}
            isUndoEnabled={this.props.isUndoEnabled}
            onRedo={this.redo}
            onSequenceDelete={this.deleteSelectedSequence}
            onSequenceDuplicate={this.duplicateSelectedSequence}
            onSequenceOpen={this.openSequence}
            onUndo={this.undo}
            selectedSequence={this.getSelectedSequence()}
          />
          <Timeline
            isVisible={!this.props.isStopped}
            offset={this.props.position * 2 + 16}
          />
          <TrackEditingModal
            onDelete={this.deleteTrack}
            onDismiss={this.deselectTrack}
            onVoiceSet={this.props.onTrackVoiceSet}
            onVolumeSet={this.props.onTrackVolumeSet}
            stagedTrack={this.getSelectedTrack()}
          />
        </React.Fragment>
      </div>
    );
  }

  deleteSelectedSequence = e => {
    e.preventDefault();

    const selectedSequence = this.getSelectedSequence();

    if (isNil(selectedSequence)) return;

    this.props.onSequenceDelete(selectedSequence);
  };

  deleteTrack = track => {
    this.props.onTrackDelete(track);

    this.deselectTrack();
  };

  deselectTrack = () => {
    this.setState({
      selectedTrackId: '',
    });
  };

  duplicateSelectedSequence = e => {
    e.preventDefault();

    const selectedSequence = this.getSelectedSequence();

    if (isEmpty(selectedSequence)) return;

    const duplicatedSequence = Dawww.createSequence(
      selectedSequence.trackId,
      selectedSequence.position,
      selectedSequence.measureCount,
    );

    this.props.onSequenceDuplicate(duplicatedSequence, selectedSequence);

    this.setState({
      selectedSequenceId: duplicatedSequence.id,
    });
  };

  getSelectedSequence = () =>
    find(s => s.id === this.state.selectedSequenceId, this.props.sequences);

  getSelectedTrack = () =>
    find(t => t.id === this.state.selectedTrackId, this.props.tracks);

  handleTrackListPositionSet = position => {
    if (this.props.isStopped) return;

    this.props.onPositionSet(position);
  };

  handleTrackListSequenceAdd = (track, position) => {
    const sequence = Dawww.createSequence(track.id, position);

    this.props.onSequenceAdd(sequence);
  };

  handleTrackListSequenceDeselect = () => {
    this.setState({
      selectedSequenceId: '',
    });
  };

  handleTrackListSequenceSelect = sequence => {
    this.setState({
      selectedSequenceId: sequence.id,
    });
  };

  handleTrackListTrackAdd = () => {
    const track = Dawww.createTrack();
    const sequence = Dawww.createSequence(track.id);

    this.props.onTrackAdd(track, sequence);
  };

  handleTracksEditorToolbarSequenceDelete = () => {
    this.props.onSequenceDelete(this.getSelectedSequence());
  };

  handleTracksEditorToolbarSequenceOpen = () => {
    this.openSequence(this.getSelectedSequence());
  };

  openSequence = sequence => {
    this.props.history.push(`${this.props.match.url}/sequencer/${sequence.id}`);
  };

  redo = () => {
    if (!this.props.isRedoEnabled) return;

    this.props.onRedo();
  };

  selectTrack = track => {
    this.setState({
      selectedTrackId: track.id,
    });
  };

  undo = () => {
    if (!this.props.isUndoEnabled) return;

    this.props.onUndo();
  };
}

export default withStyles(styles)(TracksEditor);
