import React from 'react';
import { AsyncBoundary } from '../../utils/AsyncBoundary';
import ManagingMemberLanding from '../../components/memberManage/ManagingMemberLanding';
import TestLanding from '../../components/TestLanding';

function Folder() {
  return (
    <AsyncBoundary>
      <ManagingMemberLanding />
    </AsyncBoundary>
  );
}

export default Folder;
