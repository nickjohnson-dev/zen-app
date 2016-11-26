import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import classnames from 'classnames';
import shared from '../../../shared';
import { Note } from '../note/note';
import './notes.scss';

const { toolTypes } = shared.constants;
const { showIf } = shared.helpers;

export class Notes extends React.Component {
  static propTypes = {
    isMoving: React.PropTypes.bool.isRequired,
    isPanning: React.PropTypes.bool.isRequired,
    isResizing: React.PropTypes.bool.isRequired,
    isSelecting: React.PropTypes.bool.isRequired,
    measureCount: React.PropTypes.number.isRequired,
    mousePoint: React.PropTypes.object.isRequired,
    notes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onDraw: React.PropTypes.func.isRequired,
    onErase: React.PropTypes.func.isRequired,
    onMoveStart: React.PropTypes.func.isRequired,
    onMoveUpdate: React.PropTypes.func.isRequired,
    onNotePreview: React.PropTypes.func.isRequired,
    onNoteSelect: React.PropTypes.func.isRequired,
    onResizeStart: React.PropTypes.func.isRequired,
    onResizeUpdate: React.PropTypes.func.isRequired,
    onSelectStart: React.PropTypes.func.isRequired,
    onSelectUpdate: React.PropTypes.func.isRequired,
    selectedNotes: React.PropTypes.arrayOf(
      React.PropTypes.object,
    ).isRequired,
    toolType: React.PropTypes.string.isRequired,
  }

  render() {
    return h('.notes', {
      className: this.getCursorClasses(),
      onMouseDown: this.handleMouseDown,
      onMouseMove: this.handleMouseMove,
      onMouseUp: this.handleMouseUp,
      style: this.getStyle(),
    }, [
      showIf(this.getIsDrawing())(
        h(Note, {
          className: 'notes__note--ghost',
          isSelected: false,
          note: this.getGhostNoteNote(),
        }),
      ),
      ...this.props.notes.map(note => h(Note, {
        className: 'notes__note',
        key: note.id,
        isSelected: this.getIsNoteSelected(note),
        onEndpointMouseDown: this.handleNoteEndpointMouseDown,
        onMouseDown: this.handleNoteMouseDown,
        onMouseUp: this.handleNoteMouseUp,
        note,
      })),
    ]);
  }

  getCursorClasses() {
    return classnames({
      'notes--grab': this.props.toolType === toolTypes.PAN,
    });
  }

  getGhostNoteNote() {
    const point = this.props.mousePoint;
    return {
      points: [
        {
          x: point ? point.x : 0,
          y: point ? point.y : 0,
        },
        {
          x: point ? point.x + 1 : 0,
          y: point ? point.y : 0,
        },
      ],
    };
  }

  getIsDrawing() {
    return this.props.toolType === toolTypes.DRAW;
  }

  getIsNoteSelected(note) {
    return !!_.find(this.props.selectedNotes, {
      id: note.id,
    });
  }

  getStyle() {
    return {
      width: this.props.measureCount !== undefined
        ? this.props.measureCount * 4 * 8 * 40
        : 0,
    };
  }

  handleMouseDown = (e) => {
    const { MOVE, SELECT } = toolTypes;

    if (this.props.toolType === MOVE) {
      this.props.onMoveStart();
    } else if (this.props.toolType === SELECT) {
      const isAdditive = e.ctrlKey || e.metaKey;
      this.props.onSelectStart(isAdditive);
    }

    return false;
  }

  handleMouseMove = (e) => {
    if (this.props.isMoving) {
      this.props.onMoveUpdate();
    } else if (this.props.isResizing) {
      this.props.onResizeUpdate();
    } else if (this.props.isSelecting) {
      const isAdditive = e.ctrlKey || e.metaKey;
      this.props.onSelectUpdate(isAdditive);
    }
  }

  handleMouseUp = () => {
    if (
      this.props.isMoving ||
      this.props.isPanning ||
      this.props.isResizing ||
      this.props.isSelecting
    ) return;

    if (this.props.toolType === toolTypes.DRAW) {
      this.props.onDraw();
    }
  }

  handleNoteMouseDown = (note, e) => {
    const { DRAW, SELECT } = toolTypes;

    if (
      this.props.toolType !== DRAW &&
      this.props.toolType !== SELECT
    ) return true;

    const isAdditive = e.ctrlKey || e.metaKey;
    this.props.onNotePreview(_.first(note.points));
    this.props.onNoteSelect(note, isAdditive);
    this.props.onMoveStart();
    e.stopPropagation();
    return false;
  }

  handleNoteMouseUp = (note) => {
    const { ERASE } = toolTypes;

    if (this.props.toolType === ERASE) {
      this.props.onErase(note);
    }
  }

  handleNoteEndpointMouseDown = (note, e) => {
    const { DRAW, MOVE, SELECT } = toolTypes;

    if (this.props.toolType === MOVE) {
      this.props.onMoveStart();
    } else if (this.props.toolType === DRAW || this.props.toolType === SELECT) {
      const isAdditive = e.ctrlKey || e.metaKey;
      this.props.onNotePreview(_.last(note.points));
      this.props.onNoteSelect(note, isAdditive);
      this.props.onResizeStart();
    }

    e.stopPropagation();
  }
}