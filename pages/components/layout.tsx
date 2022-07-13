import { ReactNode } from 'react';
import Navbar from './navbar';

interface AppPropsWithLayout {
  children: ReactNode;
}

export default function Layout({ children }: AppPropsWithLayout) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
