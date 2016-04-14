import { connect } from 'react-redux';
import { addNote, removeNote, setPosition, setSynth } from 'redux/actions';
import { ZenSequence } from 'components/zen-sequence/zen-sequence';

export const ZenSequenceContainer = connect(
  state => ({
    measureCount: state.measureCount,
    notes: state.notes,
    position: state.position,
    synth: state.synth,
  }),
  dispatch => ({
    requestAddNote: note => {
      dispatch(addNote(note));
    },
    requestRemoveNote: note => {
      dispatch(removeNote(note));
    },
    requestSetPosition: position => {
      dispatch(setPosition(position));
    },
    requestSetSynth: type => {
      dispatch(setSynth(type));
    },
  })
)(ZenSequence);
