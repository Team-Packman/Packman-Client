import reactDom from 'react-dom';
import React, { PropsWithChildren } from 'react';

function ModalPortal({ children }: PropsWithChildren) {
  const el = document.getElementById('modal');
  return el ? reactDom.createPortal(children, el) : null;
}

export default ModalPortal;
