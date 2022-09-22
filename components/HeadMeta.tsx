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
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
    </Head>
  );
}
export default HeadMeta;
