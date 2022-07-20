import React from 'react';
import TogetherLanding from '../../components/together/TogetherLanding';
import { AsyncBoundary } from '../../utils/AsyncBoundary';
function Together() {
  return (
    <div>
      <AsyncBoundary>
        <TogetherLanding />
      </AsyncBoundary>
    </div>
  );
}

export default Together;
