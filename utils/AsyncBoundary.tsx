import Error from 'next/error';
import { ReactNode, Suspense, useState } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';

interface AsyncBoundaryProps {
  loadingFallback?: ReactNode;
  children: ReactNode;
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
    onError: (error: unknown) => {
      error instanceof Error && setIsError(error);
    },
  };
};
const errorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div>
      error
      <button onClick={resetErrorBoundary}>reset</button>
    </div>
  );
};

export function AsyncBoundary({ children, loadingFallback }: AsyncBoundaryProps) {
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
      <Suspense fallback={loadingFallback ?? <h1>loading...</h1>}>{children}</Suspense>
    </ErrorBoundary>
  );
}
