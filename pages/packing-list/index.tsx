import React from 'react';
import { AsyncBoundary } from '../../utils/AsyncBoundary';
import PackingListLanding from './[[...slug]]';

function PackingList() {
  return (
    <AsyncBoundary>
      <PackingListLanding />
    </AsyncBoundary>
  );
}

export default PackingList;
