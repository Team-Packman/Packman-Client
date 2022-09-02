import React from 'react';
import Layout from './Layout';
import Lottie from 'lottie-react';
import { lottie } from '../../public/assets';

function Loading() {
  return (
    <Layout noHeader>
      <Lottie animationData={lottie} style={{ height: '100%' }} />
    </Layout>
  );
}

export default Loading;
