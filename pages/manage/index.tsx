import React from 'react';
import { AsyncBoundary } from '../../utils/AsyncBoundary';
import ManagingMemberLanding from '../../components/memberManage/ManagingMemberLanding';

function Folder() {
  return (
    <AsyncBoundary>
      <ManagingMemberLanding />
    </AsyncBoundary>
  );
}

export default Folder;
