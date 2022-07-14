import Navbar from './navbar';
import { ReactNode } from 'react';

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
