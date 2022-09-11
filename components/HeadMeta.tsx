import Head from 'next/head';

interface HeadMetaProps {
  description: string;
}

function HeadMeta(props: HeadMetaProps) {
  const { description } = props;

  return (
    <Head>
      <title>Packman</title>
      <meta
        name="description"
        content="내 손안 짐 챙김 도우미, 팩맨. 지금 바로 팩맨을 사용해보세요!"
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content="팩맨 - 내 손안의 짐 챙김 도우미" />
      <meta property="og:url" content="https://www.packman.kr" />
      {/*Google / Search Engine Tags*/}
      <meta itemProp="name" content="팩맨 - 내 손안의 짐 챙김 도우미" />
      <meta
        itemProp="description"
        content={description || '내 손안 짐 챙김 도우미, 팩맨. 지금 바로 팩맨을 사용해보세요!'}
      />
    </Head>
  );
}
export default HeadMeta;
