import PropTypes from 'prop-types';
import React from 'react';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components/macro';
import { AddTrackButton } from '../AddTrackButton/AddTrackButton';
import { Ruler } from '../Ruler/Ruler';
import { Track } from '../Track/Track';

const StyledTrackList = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  overflow: auto;
`;

const TrackListContent = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  min-width: 100%;
  padding: ${props => props.theme.margin.m}px;
  padding-bottom: ${props => props.theme.margin.m + 84}px;
  padding-right: ${props => props.theme.margin.m + 128}px;
  padding-top: ${props => props.theme.margin.m + 2}px;
  position: relative;
`;

const TrackListUnderlay = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export function TrackList(props) {
  const transitions = useTransition(props.tracks, track => track.id, {
    config: {
      clamp: true,
      tension: 200,
    },
    from: {
      marginLeft: -64,
      opacity: 0,
    },
    enter: {
      marginLeft: 0,
      opacity: 1,
    },
    leave: {
      marginLeft: 64,
      opacity: 0,
    },
  });

  return (
    <StyledTrackList>
      <TrackListContent>
        <TrackListUnderlay
          onClick={props.onSequenceDeselect}
        />
        <Ruler
          isStopped={props.isStopped}
          measureCount={props.songMeasureCount}
          measureWidth={64}
          onPositionSet={props.onPositionSet}
        />
        {transitions.map(({ item, key, props: animation }) => (
          <animated.div
            key={key}
            style={animation}>
            <Track
              onSequenceAdd={props.onSequenceAdd}
              onSequenceEdit={props.onSequenceEdit}
              onSequenceOpen={props.onSequenceOpen}
              onSequenceSelect={props.onSequenceSelect}
              onTrackIsMutedToggle={props.onTrackIsMutedToggle}
              onTrackIsSoloingToggle={props.onTrackIsSoloingToggle}
              onTrackSelect={props.onTrackStage}
              selectedSequence={props.selectedSequence}
              songMeasureCount={props.songMeasureCount}
              track={item}
            />
          </animated.div>
        ))}
        <AddTrackButton
          onClick={props.onTrackAdd}
          songMeasureCount={props.songMeasureCount}
        />
      </TrackListContent>
    </StyledTrackList>
  );
}

TrackList.propTypes = {
  isStopped: PropTypes.bool.isRequired,
  onPositionSet: PropTypes.func.isRequired,
  onSequenceAdd: PropTypes.func.isRequired,
  onSequenceDeselect: PropTypes.func.isRequired,
  onSequenceEdit: PropTypes.func.isRequired,
  onSequenceOpen: PropTypes.func.isRequired,
  onSequenceSelect: PropTypes.func.isRequired,
  onSongExtend: PropTypes.func.isRequired,
  onSongShorten: PropTypes.func.isRequired,
  onTrackAdd: PropTypes.func.isRequired,
  onTrackIsMutedToggle: PropTypes.func.isRequired,
  onTrackIsSoloingToggle: PropTypes.func.isRequired,
  onTrackStage: PropTypes.func.isRequired,
  selectedSequence: PropTypes.object,
  songMeasureCount: PropTypes.number.isRequired,
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
};