import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

interface HI {
  a: number;
}

const Home: NextPage = () => {
  console.log('hi');
  return (
    <div>
      hello next
      <a>hi</a>
      <img></img>
    </div>
  );
};

export default Home;
