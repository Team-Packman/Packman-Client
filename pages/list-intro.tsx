import React from 'react';
import { AsyncBoundary } from '../utils/AsyncBoundary';
import ListIntroLanding from '../components/alone/listIntro/ListIntroLanding';

function ListIntro() {
  return (
    <AsyncBoundary>
      <ListIntroLanding />
    </AsyncBoundary>
  );
}

export default ListIntro;
