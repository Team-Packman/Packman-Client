import { AxiosError } from 'axios';
import { PropsWithChildren, ReactNode, Suspense, useEffect, useState } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { QueryErrorResetBoundary, useQueryErrorResetBoundary } from 'react-query';
import { useResetRecoilState } from 'recoil';
import Error from '../components/common/Error';
import Loading from '../components/common/Loading';
import { invitationAtom } from './recoil/atom/atom';

interface AsyncBoundaryProps {
  loadingFallback?: ReactNode;
}

const isExpectedError = (res: unknown): res is Error => {
  if (typeof res !== 'object' || res == null) {
    return false;
  }

  return true;
};

export const useErrorBubbling = () => {
  const [isError, setIsError] = useState<Error | string | null>(null);

  if (isError !== null) {
    throw isError;
  }

  return {
    reportError: (error: unknown) => {
      try {
        isExpectedError(error) ? setIsError(error) : setIsError(JSON.stringify(error));
      } catch (error) {
        setIsError(String(error));
      }
    },
    isError,
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
