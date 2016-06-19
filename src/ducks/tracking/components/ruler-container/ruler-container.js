import { connect } from 'react-redux';
import song from 'ducks/song';
import transport from 'ducks/transport';
import { Ruler } from '../ruler/ruler';

export const RulerContainer = connect((state) => ({
  measureCount: song.selectors.getMeasureCount(state),
  playbackState: transport.selectors.getPlaybackState(state),
}), {
  pause: transport.actions.pause,
  play: transport.actions.play,
  setPosition: transport.actions.setTransportPosition,
})(Ruler);
