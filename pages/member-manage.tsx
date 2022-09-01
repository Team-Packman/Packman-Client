import React from 'react';
import { AsyncBoundary } from '../utils/AsyncBoundary';
import ManagingMember from '../components/memberManage/ManagingMember';

function Folder() {
  return (
    <AsyncBoundary>
      <ManagingMember />
    </AsyncBoundary>
  );
}

export default Folder;
