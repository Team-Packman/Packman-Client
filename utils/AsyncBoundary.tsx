import { AxiosError } from 'axios';
import { PropsWithChildren, ReactNode, Suspense, useState } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { QueryErrorResetBoundary, useQueryErrorResetBoundary } from 'react-query';
import { useResetRecoilState } from 'recoil';
import Error from '../components/common/Error';
import Loading from '../components/common/Loading';
import { invitationAtom } from './recoil/atom/atom';

interface AsyncBoundaryProps {
  loadingFallback?: ReactNode;
}

const isExpectedError = <Error extends unknown>(res: Error): res is Error => {
  if (typeof res !== 'object' || res == null) {
    return false;
  }

  return true;
};

export const useErrorBubbling = () => {
  const [isError, setIsError] = useState<Error | null>(null);

  if (isError !== null) {
    throw isError;
  }

  return {
    onError: (error: Error) => {
      error instanceof Error && setIsError(error);
    },
  };
};
const errorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const resetInvitation = useResetRecoilState(invitationAtom);

  if (error instanceof AxiosError) {
    switch (error.response?.status) {
      case 0:
      case 404:
        resetInvitation();
    }
  }

  return <Error />;
};

export function AsyncBoundary({
  children,
  loadingFallback,
}: PropsWithChildren<AsyncBoundaryProps>) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <QueryErrorResetBoundary>
      <ErrorBoundary
        FallbackComponent={(fallback) => {
          if (isExpectedError(fallback.error)) {
            return errorFallback(fallback);
          }
          return <h1>Unexpected Error</h1>;
        }}
        onReset={reset}
      >
        <Suspense
          fallback={loadingFallback === undefined ? <Loading /> : loadingFallback ?? <Loading />}
        >
          {children}
        </Suspense>
      </ErrorBoundary>
    </QueryErrorResetBoundary>
  );
}
