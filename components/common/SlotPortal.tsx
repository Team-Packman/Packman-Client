import reactDom from 'react-dom';
import { PropsWithChildren } from 'react';

interface SlotProps {
  id: 'layout_start' | 'layout_end' | 'wrapper_start' | 'wrapper_end';
}

function SlotPortal({ id, children }: PropsWithChildren<SlotProps>) {
  const el = document.querySelector('#' + id);
  console.log(el);
  return el ? reactDom.createPortal(children, el) : null;
}

export default SlotPortal;
