import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import HeadMeta from '../../components/HeadMeta';
import TogetherLanding from '../../components/together/TogetherLanding';
import { GetTogetherPackingListDetailOutput } from '../../service/packingList/together';
import { AsyncBoundary } from '../../utils/AsyncBoundary';

interface TogetherProps {
  title: string;
}
function Together(props: TogetherProps) {
  const { title } = props;

  return (
    <>
      <HeadMeta title={title} />
      <AsyncBoundary>
        <TogetherLanding />
      </AsyncBoundary>
    </>
  );
}

export default Together;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = context.req.cookies.accessToken as string;
  const { id } = context.query;
  const { data }: AxiosResponse<GetTogetherPackingListDetailOutput> = await axios.get(
    `${process.env.NEXT_PUBLIC_END}/list/together/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  const {
    data: { title },
  } = data;

  return {
    props: {
      title,
    },
  };
};
