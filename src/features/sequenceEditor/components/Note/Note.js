import first from "lodash/fp/first";
import includes from "lodash/fp/includes";
import last from "lodash/fp/last";
import { transparentize } from "polished";
import PropTypes from "prop-types";
import React from "react";
import Draggable from "react-draggable";
import styled from "styled-components/macro";
import shared from "../../../shared";
import * as constants from "../../constants";

const { getExtraProps } = shared.helpers;

const NoteConnector = styled.div`
  background-color: ${props =>
    props.isSelected ? "white" : transparentize(0.5, props.theme.primary[2])};
  height: 12px;
  left: 20px;
  position: absolute;
  top: 14px;
  transform-origin: left center;
  transition: transform 0.1s ease;
  width: 1px;
  z-index: 100;
`;

const NoteFill = styled.div`
  background-color: ${props =>
    props.isSelected ? "white" : props.theme.primary[2]};
  border-radius: 2px;
  box-shadow: ${props =>
    props.isSelected && `0 0 10px ${transparentize(0.5, "white")}`};
  height: 24px;
  width: 24px;

  &:hover:not(:active) {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const NotePoint = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  height: 40px;
  justify-content: center;
  left: 0;
  overflow: hidden;
  pointer-events: all;
  position: absolute;
  top: 0;
  transition: transform 0.1s ease;
  width: 40px;
  z-index: 150;
`;

const StyledNote = styled.div`
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: transform 0.1s ease;
  z-index: ${props => props.isSelected && 300};
`;

export class Note extends React.PureComponent {
  static propTypes = {
    isSelected: PropTypes.bool,
    note: PropTypes.object,
    onDrag: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragStop: PropTypes.func,
    onEndPointDrag: PropTypes.func,
    onEndPointDragStart: PropTypes.func,
    onEndPointDragStop: PropTypes.func,
    onErase: PropTypes.func,
    onResizeStart: PropTypes.func,
    onSelect: PropTypes.func,
    positionBounds: PropTypes.object,
    sizeBounds: PropTypes.object,
    toolType: PropTypes.string
  };

  static defaultProps = {
    onDrag: () => {},
    onDragStart: () => {},
    onDragStop: () => {},
    onEndPointDrag: () => {},
    onEndPointDragStart: () => {},
    onEndPointDragStop: () => {}
  };

  render() {
    return (
      <Draggable
        bounds={this.props.positionBounds}
        grid={[40, 40]}
        handle=".start-point"
        onDrag={this.handleDrag}
        onStart={this.handleDragStart}
        onStop={this.handleDragStop}
        position={this.getPosition()}
      >
        <StyledNote isSelected={this.props.isSelected} {...getExtraProps(this)}>
          <NotePoint className="start-point">
            <NoteFill isSelected={this.props.isSelected} />
          </NotePoint>
          <NoteConnector
            isSelected={this.props.isSelected}
            style={this.getConnectorStyle()}
          />
          <Draggable
            axis="x"
            bounds={this.props.sizeBounds}
            grid={[40, 40]}
            onDrag={this.handleEndPointDrag}
            onStart={this.handleEndPointDragStart}
            onStop={this.handleEndPointDragStop}
            position={this.getEndPointPosition()}
          >
            <NotePoint
              onMouseDown={this.handleEndPointMouseDown}
              style={this.getEndPointStyle()}
            >
              <NoteFill isSelected={this.props.isSelected} />
            </NotePoint>
          </Draggable>
        </StyledNote>
      </Draggable>
    );
  }

  getConnectorStyle() {
    const startPoint = first(this.props.note.points);
    const endPoint = last(this.props.note.points);
    const { asin, abs, PI, sign, sqrt } = Math;
    const x = (endPoint.x - startPoint.x) * 40;
    const y = (endPoint.y - startPoint.y) * 40;
    const scale = x !== 0 ? sqrt(abs(x ** 2 + y ** 2)) : 0;
    const rotation = x !== 0 ? asin(abs(y / scale)) * (180 / PI) * sign(y) : 0;
    return {
      transform: `rotate(${rotation}deg) scaleX(${scale})`
    };
  }

  getEndPointPosition = () => ({
    x: (this.props.note.points[1].x - this.props.note.points[0].x) * 40,
    y: (this.props.note.points[1].y - this.props.note.points[0].y) * 40
  });

  getEndPointStyle() {
    const startPoint = first(this.props.note.points);
    const endPoint = last(this.props.note.points);
    const x = (endPoint.x - startPoint.x) * 40;
    const y = (endPoint.y - startPoint.y) * 40;
    return {
      display: is32ndNote(this.props.note) ? "none" : "flex",
      transform: `translate(${x}px, ${y}px)`
    };
  }

  getIsEraseEnabled = () => this.props.toolType === constants.toolTypes.ERASE;

  getIsSelectEnabled = () =>
    includes(this.props.toolType, [
      constants.toolTypes.DRAW,
      constants.toolTypes.SELECT
    ]);

  getPosition = () => ({
    x: this.props.note.points[0].x * 40,
    y: this.props.note.points[0].y * 40
  });

  handleDrag = (e, { deltaX, deltaY }) => {
    this.props.onDrag({
      deltaX: Math.round(deltaX / 40),
      deltaY: Math.round(deltaY / 40)
    });
  };

  handleDragStart = e => {
    this.select(e);

    this.props.onDragStart(this.props.note, e);
  };

  handleDragStop = () => {
    this.props.onDragStop();
  };

  handleEndPointDrag = (e, { deltaX }) => {
    this.props.onEndPointDrag({
      deltaX: Math.round(deltaX / 40)
    });
  };

  handleEndPointDragStart = e => {
    this.select(e);

    this.props.onEndPointDragStart(this.props.note, e);
  };

  handleEndPointDragStop = () => {
    this.props.onEndPointDragStop();
  };

  handleEndPointMouseDown = e => {
    if (this.getIsSelectEnabled()) {
      this.select(e);

      this.props.onResizeStart();
    }
  };

  select = e => {
    const isAdditive = e.ctrlKey || e.metaKey;

    if (!this.getIsSelectEnabled() || (this.props.isSelected && !isAdditive))
      return;

    this.props.onSelect(this.props.note, isAdditive);
  };
}

function is32ndNote(note) {
  const length = last(note.points).x - first(note.points).x;
  return length === 0;
}
