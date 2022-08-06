import React from 'react';
import PreviewLanding from '../../components/preview/PreviewLanding';
import { AsyncBoundary } from '../../utils/AsyncBoundary';

function Preview() {
  return (
    <AsyncBoundary>
      <PreviewLanding />
    </AsyncBoundary>
  );
}

export default Preview;
