import Head from 'next/head';

interface HeadMetaProps {
  title?: string;
  description?: string;
  page?: string;
}

function HeadMeta(props: HeadMetaProps) {
  const { page } = props;
  let title, description;

  const assignMeta = (t: string, d: string) => {
    title = t;
    description = d;
  };

  if (page) {
    switch (page) {
      case 'login':
        assignMeta('Packman : 로그인', '카카오 로그인으로 3초만에 시작하기');
        break;
      case 'edit-profile':
        assignMeta('', 'Packman : 문의하기');
        break;
    }
  }

  return (
    <Head>
      <title>{title || 'Packman'}</title>
      <meta
        name="description"
        content={description || '내 손안 짐 챙김 도우미, 팩맨. 지금 바로 팩맨을 사용해보세요!'}
      />
      <meta
        name="viewport"
        content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
      />
      <meta property="og:title" content={description || '팩맨 - 내 손안의 짐 챙김 도우미'} />
    </Head>
  );
}
export default HeadMeta;
