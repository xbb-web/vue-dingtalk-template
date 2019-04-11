module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'cn',
      fallbackLocale: 'cn',
      localeDir: 'locales',
      enableInSFC: false
    },
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },

  devServer: {
    proxy: {
      '/dev': {
        target: 'http://localhost:5555',
        changeOrigin: true,
        pathRewrite: {
          '^/dev': ''
        }
      },
      '/mock': {
        target: 'http://yapi.xbongbong.com',
        changeOrigin: true,
        pathRewrite: {
          '^/mock': '/mock/87'
        }
      }
    }
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  }
}
