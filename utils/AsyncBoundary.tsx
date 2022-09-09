import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { PropsWithChildren, ReactNode, Suspense, useState } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';
import { useResetRecoilState } from 'recoil';
import Error from '../components/common/Error';
import Loading from '../components/common/Loading';
import { authUserAtom, invitationAtom } from './recoil/atom/atom';

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
  const router = useRouter();
  const resetUser = useResetRecoilState(authUserAtom);
  const resetInvitation = useResetRecoilState(invitationAtom);

  if (error instanceof AxiosError && error.response?.status === 0) {
    resetUser();
    resetInvitation();
    router.replace('/login');
  }

  return (
    <div>
      <Error />
      <button onClick={resetErrorBoundary}>reset</button>
    </div>
  );
};

export function AsyncBoundary({
  children,
  loadingFallback,
}: PropsWithChildren<AsyncBoundaryProps>) {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => {
        if (isExpectedError(error)) {
          return errorFallback({ error, resetErrorBoundary });
        }
        return <h1>Unexpected Error</h1>;
      }}
      onReset={reset}
    >
      <Suspense fallback={loadingFallback ?? <Loading />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
