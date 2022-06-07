const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    config.plugins.push(
      new WatchExternalFilesPlugin({
        files: [
          './walkthru/**/*.json',
          './walkthru/**/*.md',
        ]
      })
    )
    return config
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
