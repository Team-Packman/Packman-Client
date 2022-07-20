import React from 'react';
import { AsyncBoundary } from '../../utils/AsyncBoundary';
import SelectTemplateLanding from '../components/selectTemplate/[categoryName]';

function index() {
  return (
    <AsyncBoundary>
      <SelectTemplateLanding />
    </AsyncBoundary>
  );
}

export default index;
