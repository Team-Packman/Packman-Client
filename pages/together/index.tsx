import React from 'react';
import TogetherLanding from '../../components/together/TogetherLanding';
import { AsyncBoundary } from '../../utils/AsyncBoundary';

function Together() {
  return (
    <AsyncBoundary>
      <TogetherLanding />
    </AsyncBoundary>
  );
}

export default Together;
