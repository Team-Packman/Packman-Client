const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */

module.exports = withPlugins([
  [
    withPWA({
      poweredByHeader: process.env.NODE_ENV === 'development',
      reactStrictMode: process.env.NODE_ENV === 'development',
      pwa: {
        dest: 'public',
        runtimeCaching,
      },
      async redirects() {
        return [
          {
            source: '/',
            destination: '/login',
            permanent: true,
          },
        ];
      },
      compiler: {
        removeConsole: {
          exclude: ['error'],
        },
        styledComponents: true,
      },
      webpack: (config, options) => {
        config.plugins.push();

        return config;
      },
    }),
  ],
  [withBundleAnalyzer],
]);
