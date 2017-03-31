import React from 'react';
import h from 'react-hyperscript';
import contextMenu from '../../../context-menu';
import sequencer from '../../../sequencer';
import shared from '../../../shared';
import tracker from '../../../tracker';
import { BPMModalContainer } from '../bpm-modal/bpm-modal-container';
import { UploadOverlayContainer } from '../upload-overlay/upload-overlay-container';
import { SongToolbarContainer } from '../song-toolbar/song-toolbar-container';
import './app.scss';

const { ContextMenuContainer } = contextMenu.components;
const { SequencerContainer } = sequencer.components;
const { hideIf, showIf } = shared.helpers;
const { Tracker } = tracker.components;

export class App extends React.Component {
  static propTypes = {
    isSequenceOpen: React.PropTypes.bool.isRequired,
    onFileDragStart: React.PropTypes.func.isRequired,
  }

  render() {
    return h('.app', {
      onDragEnter: this.handleDragEnter,
      onDragOver: this.handleDragOver,
      onDrop: this.handleDrop,
    }, [
      showIf(this.props.isSequenceOpen)(
        h(SequencerContainer),
      ),
      hideIf(this.props.isSequenceOpen)(
        h(Tracker),
      ),
      h(SongToolbarContainer),
      h(BPMModalContainer),
      h(ContextMenuContainer),
      h(UploadOverlayContainer),
    ]);
  }

  handleDragEnter = (e) => {
    this.props.onFileDragStart();
    e.preventDefault();
    e.stopPropagation();
  }

  handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }
}
