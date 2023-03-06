import { NextSeo } from 'next-seo';

interface HeadMetaProps {
  title?: string;
  description?: string;
  url?: string;
}

function HeadMeta(props: HeadMetaProps) {
  const {
    title = '팩맨 Packman - 내 손안 짐챙김 도우미',
    description = '내 손안 짐 챙김 도우미, 팩맨. 지금 바로 팩맨을 사용해보세요!',
    url = 'https:/www.packman.kr',
  } = props;

  return (
    <NextSeo
      title={title}
      description="내 손안 짐 챙김 도우미, 팩맨. 지금 바로 팩맨을 사용해보세요!"
      openGraph={{
        url,
        title,
        description,
        siteName: 'Packman',
        type: 'website',
        images: [
          {
            url: '/assets/pwa/apple-splash-1136-640.jpg',
            alt: 'Packman Og Image',
            type: 'image/jpg',
          },
        ],
      }}
    />
  );
}
export default HeadMeta;
