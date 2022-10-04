import Head from 'next/head';

interface HeadMetaProps {
  title?: string;
  description?: string;
  url?: string;
}

function HeadMeta(props: HeadMetaProps) {
  const { title, description, url } = props;

  return (
    <Head>
      <title>{title || '팩맨 Packman - 내 손안 짐챙김 도우미'}</title>
      <meta
        name="description"
        content={description || '내 손안 짐 챙김 도우미, 팩맨. 지금 바로 팩맨을 사용해보세요!'}
      />
      <meta property="og:locale" content="ko" />
      <meta property="og:site_name" content="Packman" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={title || '팩맨 Packman - 내 손안 짐챙김 도우미'}
        key="og:title"
      />
      <meta
        property="og:description"
        content={description || '내 손안 짐 챙김 도우미, 팩맨. 지금 바로 팩맨을 사용해보세요!'}
        key="og:description"
      />
      <meta property="og:image" content="/assets/pwa/apple-splash-1136-640.jpg" />
      <meta property="og:url" content={url || 'https://www.packman.kr'} key="og:url" />
    </Head>
  );
}
export default HeadMeta;
