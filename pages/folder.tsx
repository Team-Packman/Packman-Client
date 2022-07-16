import React from 'react';
import { AsyncBoundary } from '../utils/AsyncBoundary';
import FolderLanding from './components/FolderLanding';

function Folder() {
  return (
    <AsyncBoundary>
      <FolderLanding />
    </AsyncBoundary>
  );
}

export default Folder;
