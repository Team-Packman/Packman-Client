import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import HeadMeta from '../../components/HeadMeta';
import TogetherLanding from '../../components/together/TogetherLanding';
import apiService from '../../service';
import { AsyncBoundary } from '../../utils/AsyncBoundary';
import { client } from '../../utils/axios';

interface TogetherProps {
  props: { title: string };
}

function Together(props: TogetherProps) {
  const {
    props: { title: headerTitle },
  } = props;
  const router = useRouter();

  return (
    <AsyncBoundary>
      <HeadMeta
        title={headerTitle}
        description={`[${headerTitle}] 패킹리스트가 공유되었어요!`}
        url={`${process.env.NEXT_PUBLIC_DOMAIN}/${router.asPath}`}
      />
      <TogetherLanding />
    </AsyncBoundary>
  );
}

export default Together;

Together.getInitialProps = async function ({ req, query }: NextPageContext) {
  const getPackingListHeader = apiService.packingList.together.getPackingListHeader;
  const cookie = req?.headers?.cookie?.split(';');
  const regex = new RegExp(/(?<=accessToken=).+/, 'g');
  const accessToken = cookie && cookie[1].match(regex);

  client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  const { data: header } = await getPackingListHeader(query.id as string, false);
  const { title } = header;
  return {
    title,
  };
};
