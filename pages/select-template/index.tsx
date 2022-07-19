import React from 'react';
import { AsyncBoundary } from '../../utils/AsyncBoundary';
import SelectTemplateLanding from './[categoryName]';

function index() {
  return (
    <AsyncBoundary>
      <SelectTemplateLanding />
    </AsyncBoundary>
  );
}

export default index;
