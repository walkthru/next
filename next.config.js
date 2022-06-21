const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    config.resolve.fallback = { fs: false }
    config.resolve.alias.react = path.resolve('./node_modules/react')
    return config
  },
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/walkthru-intro',
        permanent: true,
      },
    ]
  },
  webpack5: true,
}

module.exports = nextConfig
