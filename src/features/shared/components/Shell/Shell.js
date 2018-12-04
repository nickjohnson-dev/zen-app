import styled from 'styled-components';

export const Shell = styled.div`
  background-color: ${props => props.theme.almostblack};
  color: ${props => props.theme.almostblack};
  bottom: 0;
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
`;
