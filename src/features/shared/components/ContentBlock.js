import React from 'react';
import styled from 'styled-components';

import Box from './Box';

const Root = styled(Box)({
  maxWidth: 640,
});

function ContentBlock(props) {
  const { children, ...rest } = props;

  return (
    <Root marginX="auto" width="full" {...rest}>
      {children}
    </Root>
  );
}

export default React.memo(ContentBlock);