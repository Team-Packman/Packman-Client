import React from 'react';
import PreviewLanding from '../../components/together/PreviewLanding';
import { AsyncBoundary } from '../../utils/AsyncBoundary';
function Preview() {
  return (
    <div>
      <AsyncBoundary>
        <PreviewLanding />
      </AsyncBoundary>
    </div>
  );
}

export default Preview;
