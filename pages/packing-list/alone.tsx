import React from 'react';
import AlonePackingListLanding from '../../components/packingList/alone/AlonePackingListLanding';
import { AsyncBoundary } from '../../utils/AsyncBoundary';

function index() {
  return (
    <AsyncBoundary>
      <AlonePackingListLanding />
    </AsyncBoundary>
  );
}

export default index;
