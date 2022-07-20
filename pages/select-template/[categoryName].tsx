import React from 'react';
import { AsyncBoundary } from '../../utils/AsyncBoundary';
import SelectTemplateLanding from '../components/selectTemplate/SelectTemplateLanding';

function index() {
  return (
    <AsyncBoundary>
      <SelectTemplateLanding />
    </AsyncBoundary>
  );
}

export default index;
