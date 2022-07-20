import React from 'react';
import { AsyncBoundary } from '../../../utils/AsyncBoundary';
import AlonePackingListLanding from '../../components/packingList/alone/AlonePackingListLanding';

function index() {
  return (
    <AsyncBoundary>
      <AlonePackingListLanding />
    </AsyncBoundary>
  );
}

export default index;
