import Dawww from 'dawww';
import getOr from 'lodash/fp/getOr';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import { TrackList } from '../TrackList/TrackList';
import { TrackerToolbar } from '../TrackerToolbar/TrackerToolbar';
import { SongInfoModal } from '../SongInfoModal/SongInfoModal';
import { TrackEditingModal } from '../TrackEditingModal/TrackEditingModal';
import './Tracker.scss';

const { Timeline } = shared.components;

export class Tracker extends React.PureComponent {
  static propTypes = {
    bpm: PropTypes.number.isRequired,
    isStopped: PropTypes.bool.isRequired,
    onBPMChange: PropTypes.func.isRequired,
    onMeasureCountChange: PropTypes.func.isRequired,
    onSequenceAdd: PropTypes.func.isRequired,
    onSequenceDelete: PropTypes.func.isRequired,
    onSequenceExtend: PropTypes.func.isRequired,
    onSequenceMoveLeft: PropTypes.func.isRequired,
    onSequenceMoveRight: PropTypes.func.isRequired,
    onSequenceOpen: PropTypes.func.isRequired,
    onSequenceShorten: PropTypes.func.isRequired,
    onSongExtend: PropTypes.func.isRequired,
    onSongShorten: PropTypes.func.isRequired,
    onTrackAdd: PropTypes.func.isRequired,
    onTrackDelete: PropTypes.func.isRequired,
    onTrackEditingFinish: PropTypes.func.isRequired,
    onTrackEditingStart: PropTypes.func.isRequired,
    onTrackIsMutedToggle: PropTypes.func.isRequired,
    onTrackIsSoloingToggle: PropTypes.func.isRequired,
    onTrackVoiceSet: PropTypes.func.isRequired,
    position: PropTypes.number.isRequired,
    sequenceMap: PropTypes.object.isRequired,
    songMeasureCount: PropTypes.number.isRequired,
    trackMap: PropTypes.object.isRequired,
    trackToEditId: PropTypes.string.isRequired,
    tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  state = {
    isSongInfoModalOpen: false,
    selectedSequenceId: '',
  };

  render() {
    return h('.tracker', [
      h(TrackerToolbar, {
        onSequenceDelete: this.handleTrackerToolbarSequenceDelete,
        onSequenceExtend: this.handleTrackerToolbarSequenceExtend,
        onSequenceMoveLeft: this.handleTrackerToolbarSequenceMoveLeft,
        onSequenceMoveRight: this.handleTrackerToolbarSequenceMoveRight,
        onSequenceOpen: this.handleTrackerToolbarSequenceOpen,
        onSequenceShorten: this.handleTrackerToolbarSequenceShorten,
        selectedSequence: this.getSelectedSequence(),
      }),
      h(TrackList, {
        bpm: this.props.bpm,
        onSequenceAdd: this.handleTrackListSequenceAdd,
        onSequenceDeselect: this.handleTrackListSequenceDeselect,
        onSequenceOpen: this.props.onSequenceOpen,
        onSequenceSelect: this.handleTrackListSequenceSelect,
        onSongExtend: this.props.onSongExtend,
        onSongInfoPress: this.handleTrackListSongInfoPress,
        onSongShorten: this.props.onSongShorten,
        onTrackAdd: this.handleTrackListTrackAdd,
        onTrackIsMutedToggle: this.props.onTrackIsMutedToggle,
        onTrackIsSoloingToggle: this.props.onTrackIsSoloingToggle,
        onTrackStage: this.props.onTrackEditingStart,
        selectedSequence: this.getSelectedSequence(),
        songMeasureCount: this.props.songMeasureCount,
        tracks: this.props.tracks,
      }),
      h(Timeline, {
        isVisible: !this.props.isStopped,
        offset: (this.props.position * 2) + 100,
      }),
      h(SongInfoModal, {
        bpm: this.props.bpm,
        isOpen: this.state.isSongInfoModalOpen,
        measureCount: this.props.songMeasureCount,
        onBPMChange: this.props.onBPMChange,
        onConfirm: this.handleSongInfoModalConfirm,
        onMeasureCountChange: this.props.onMeasureCountChange,
      }),
      h(TrackEditingModal, {
        onDelete: this.handleTrackEditingModalDelete,
        onDismiss: this.props.onTrackEditingFinish,
        onVoiceSet: this.props.onTrackVoiceSet,
        stagedTrack: this.getStagedTrack(),
      }),
    ]);
  }

  getSelectedSequence = () =>
    getOr({}, `props.sequenceMap.${this.state.selectedSequenceId}`, this);

  getStagedTrack = () =>
    getOr({}, `props.trackMap.${this.props.trackToEditId}`, this);

  handleSongInfoModalConfirm = () => {
    this.setState({
      isSongInfoModalOpen: false,
    });
  }

  handleTrackEditingModalDelete = (track) => {
    this.props.onTrackDelete(track);

    this.props.onTrackEditingFinish();
  }

  handleTrackListSequenceAdd = (track, position) => {
    const sequence = Dawww.createSequence(track.id, position);

    this.props.onSequenceAdd(sequence);

    this.setState({
      selectedSequenceId: sequence.id,
    });
  };

  handleTrackListSequenceDeselect = () => {
    this.setState({
      selectedSequenceId: '',
    });
  };

  handleTrackListSequenceSelect = (sequence) => {
    this.setState({
      selectedSequenceId: sequence.id,
    });
  };

  handleTrackListSongInfoPress = () => {
    this.setState({
      isSongInfoModalOpen: true,
    });
  };

  handleTrackListTrackAdd = () => {
    const track = Dawww.createTrack();
    const sequence = Dawww.createSequence(track.id);

    this.props.onTrackAdd(track, sequence);

    this.setState({
      selectedSequenceId: sequence.id,
    });
  };

  handleTrackerToolbarSequenceDelete = () => {
    this.props.onSequenceDelete(this.getSelectedSequence());
  };

  handleTrackerToolbarSequenceExtend = () => {
    this.props.onSequenceExtend(this.getSelectedSequence());
  };

  handleTrackerToolbarSequenceMoveLeft = () => {
    this.props.onSequenceMoveLeft(this.getSelectedSequence());
  };

  handleTrackerToolbarSequenceMoveRight = () => {
    this.props.onSequenceMoveRight(this.getSelectedSequence());
  };

  handleTrackerToolbarSequenceOpen = () => {
    this.props.onSequenceOpen(this.getSelectedSequence());
  };

  handleTrackerToolbarSequenceShorten = () => {
    if (this.getSelectedSequence().measureCount < 2) return;
    this.props.onSequenceShorten(this.getSelectedSequence());
  }
}
