import { connect } from 'react-redux';
import shared from '../../../shared';
import song from '../../../song';
import { SequenceEditor } from './SequenceEditor';

export const SequenceEditorContainer = connect((state, ownProps) => ({
    isRedoEnabled: song.selectors.getIsRedoEnabled(state),
    isUndoEnabled: song.selectors.getIsUndoEnabled(state),
    notes: song.selectors.getNotesBySequenceId(
      ownProps.match.params.sequenceId,
    )(state),
    sequence: song.selectors.getSequenceById(
      ownProps.match.params.sequenceId,
    )(state),
}), {
  onDelete: shared.actions.notesDeleted,
  onDraw: shared.actions.noteDrawn,
  onDrag: shared.actions.notesDragged,
  onDuplicate: shared.actions.notesDuplicated,
  onErase: shared.actions.noteErased,
  onLoad: shared.actions.sequenceFocused,
  onNudge: shared.actions.notesNudged,
  onOctaveDown: shared.actions.notesMovedOctaveDown,
  onOctaveUp: shared.actions.notesMovedOctaveUp,
  onPitchPreview: shared.actions.pitchPreviewed,
  onRedo: shared.actions.redoRequested,
  onResize: shared.actions.notesResized,
  onUndo: shared.actions.undoRequested,
}, (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onDraw: point => dispatchProps.onDraw(point, stateProps.sequence),
  onNudge: (delta, selectedNotes) =>
    dispatchProps.onNudge(delta, selectedNotes, stateProps.sequence),
  onPitchPreview: pitch => dispatchProps.onPitchPreview(pitch, stateProps.sequence),
}))(SequenceEditor);