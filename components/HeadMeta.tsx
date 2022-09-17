import Head from 'next/head';
import { useEffect, useState } from 'react';

interface HeadMetaProps {
  page?: string;
}

function HeadMeta(props: HeadMetaProps) {
  const { page } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const assignMeta = (t: string, d: string) => {
    setTitle(t);
    setDescription(d);
  };

  useEffect(() => {
    if (page) {
      switch (page) {
        case 'Login':
          assignMeta('Packman : 로그인', '카카오 로그인으로 3초만에 시작하기');
          break;
        case 'EditProfile':
          assignMeta('', 'Packman : 문의하기');
          break;
      }
    } else {
      assignMeta('Packman', '내 손안 짐 챙김 도우미, 팩맨. 지금 바로 팩맨을 사용해보세요!');
    }
  }, [page]);

  return (
    <Head>
      <title lang="en">{title}</title>
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
      />
      <meta
        property="og:title"
        content={title === 'Packman' ? '팩맨 - 내 손안의 짐 챙김 도우미' : title}
      />
      <meta property="og:description" content={description} />
    </Head>
  );
}
export default HeadMeta;
