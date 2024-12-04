module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  basePath: '',
  assetPrefix: '',
  poweredByHeader: false,
  compress: true,
  generateBuildId: async () => {
    // Aquí puedes implementar una lógica personalizada para generar un ID de construcción único
    return 'afasfadadasd';
  },
  images: {
    domains: ['example.com'],
    formats: ['image/avif', 'image/webp']
  },
  redirects: async () => [
    {
      source: '/old-page',
      destination: '/new-page',
      permanent: true
    }
  ],
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: 'https://api.example.com/:path*'
    },
    {
      source: '/juegos/:tipoJuego/:oidJuego/:oidUsuario',
      destination: '/juegos'
    },
    {
      source: '/sopadeletras',
      destination: '/sopadeletras'
    },
    {
      source: '/ahorcado',
      destination: '/ahorcado'
    },
    {
      source: '/crucigrama',
      destination: '/crucigrama'
    },
    {
      source: '/trivia',
      destination: '/trivia'
    }
  ]
};