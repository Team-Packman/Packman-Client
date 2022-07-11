export function connectMSW() {
  const isServer = typeof window === 'undefined' ? true : false;

  if (process.env.NODE_ENV === 'development') {
    if (isServer) {
      (async () => {
        const { server } = await import('../mocks/server');
        server.listen();
      })();
    } else {
      (async () => {
        const { worker } = await import('../mocks/worker');
        worker.start();
      })();
    }
  }
}
