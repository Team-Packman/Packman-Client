import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import AloneLanding from '../../components/alone/AloneLanding';
import HeadMeta from '../../components/HeadMeta';
import { GetAlonePackingListDetailOutput } from '../../service/packingList/alone';
import { AsyncBoundary } from '../../utils/AsyncBoundary';
interface AloneProps {
  title: string;
}
function Alone(props: AloneProps) {
  const { title } = props;

  return (
    <>
      <HeadMeta title={title} />
      <AsyncBoundary>
        <AloneLanding />
      </AsyncBoundary>
    </>
  );
}

export default Alone;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = context.req.cookies.accessToken as string;
  const { id } = context.query;
  const { data }: AxiosResponse<GetAlonePackingListDetailOutput> = await axios.get(
    `${process.env.NEXT_PUBLIC_END}/list/alone/${id}`,
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
