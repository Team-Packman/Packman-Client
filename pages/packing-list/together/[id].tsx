import React from 'react';
import { AsyncBoundary } from '../../../utils/AsyncBoundary';
import TogetherPackingListLanding from '../../components/packingList/together/TogetherPackingListLanding';

function index() {
  return (
    <AsyncBoundary>
      <TogetherPackingListLanding />
    </AsyncBoundary>
  );
}

export default index;
