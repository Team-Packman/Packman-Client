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
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/assets/pwa/apple-splash-1136-640.jpg" />
      <meta property="og:url" content="https://www.packman.kr" />
    </Head>
  );
}
export default HeadMeta;
