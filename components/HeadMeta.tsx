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
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:locale" content="ko" />
      <meta property="og:site_name" content="Packman" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:image" content="/assets/pwa/apple-splash-1136-640.jpg" key="og:image" />
      <meta property="og:url" content={url} key="og:url" />
    </Head>
  );
}
export default HeadMeta;
