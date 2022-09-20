import Head from 'next/head';

interface HeadMetaProps {
  props: {
    title?: string;
    description?: string;
  };
}

function HeadMeta(props: HeadMetaProps) {
  const {
    props: { title, description },
  } = props;

  return (
    <Head>
      <title>{title || '팩맨 - 내 손안의 짐 챙김 도우미'}</title>
      <meta
        name="description"
        content={description || '내 손안 짐 챙김 도우미, 팩맨. 지금 바로 팩맨을 사용해보세요!'}
      />
      <meta
        name="viewport"
        content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
      />
      <meta property="og:title" content={title || '팩맨 - 내 손안의 짐 챙김 도우미'} />
      <meta
        property="og:description"
        content={description || '내 손안 짐 챙김 도우미, 팩맨. 지금 바로 팩맨을 사용해보세요!'}
      />
      <meta property="og:image" content="/assets/pwa/apple-splash-1136-640.jpg" />
      <meta property="og:url" content="https://www.packman.kr" />
    </Head>
  );
}
export default HeadMeta;
