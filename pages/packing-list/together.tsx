import React from 'react';
import TogetherPackingListLanding from '../../components/packingList/together/TogetherPackingListLanding';
import { AsyncBoundary } from '../../utils/AsyncBoundary';

function index() {
  return (
    <AsyncBoundary>
      <TogetherPackingListLanding />
    </AsyncBoundary>
  );
}

export default index;
