import React from 'react';
import { AsyncBoundary } from '../utils/AsyncBoundary';
import TestLanding from './components/TestLanding';

function test() {
  return (
    <AsyncBoundary>
      <TestLanding />
    </AsyncBoundary>
  );
}

export default test;
