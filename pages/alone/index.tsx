import React from 'react';
import AloneLanding from '../../components/alone/AloneLanding';
import { AsyncBoundary } from '../../utils/AsyncBoundary';
function Alone() {
  return (
    <AsyncBoundary>
      <AloneLanding />
    </AsyncBoundary>
  );
}

export default Alone;
