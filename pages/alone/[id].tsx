import React from 'react';
import AloneLanding from '../../components/alone/AloneLanding';
import { AsyncBoundary } from '../../utils/AsyncBoundary';
function Alone() {
  return (
    <div>
      <AsyncBoundary>
        <AloneLanding />
      </AsyncBoundary>
    </div>
  );
}

export default Alone;
