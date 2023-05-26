import React from 'react';
import { AsyncBoundary } from '../../utils/AsyncBoundary';
import FolderLanding from '../../components/folder/FolderLanding';

function Folder() {
  return (
    <AsyncBoundary>
      <FolderLanding />
    </AsyncBoundary>
  );
}

export default Folder;
