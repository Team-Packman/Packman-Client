import React from 'react';
import PackingListLanding from '../../components/packingList/PackingListLanding';
import { AsyncBoundary } from '../../utils/AsyncBoundary';

function index() {
  return (
    <AsyncBoundary>
      <PackingListLanding />
    </AsyncBoundary>
  );
}

export default index;
