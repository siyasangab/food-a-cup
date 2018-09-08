module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'canteen_web',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      { hid: 'description', name: 'description', content: 'Canteen online ordering app' },
      //{ 'http-equiv': 'Content-Security-Policy', content: "script-src 'self' https://maps.googleapis.com"  }

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Francois+One' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=PT+Sans' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Patrick+Hand' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=PT+Sans' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ],
    script: [
        { src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCm87DgY3E50Ebz58GcE1k6BIro90JMxAw&libraries=places' },
        { src: 'https://storage.googleapis.com/code.getmdl.io/1.0.6/material.min.js' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['axios', 'vuetify'],
  },
  css: ['~/assets/main.css', '~/assets/app.styl'],
  plugins: [{ src: '~/plugins/localStorage.js', ssr: false }, '~plugins/vuetify.js'],
  modules: ['cookie-universal-nuxt', '@nuxtjs/pwa']
}

