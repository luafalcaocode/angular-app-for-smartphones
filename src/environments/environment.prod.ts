export const environment = {
  production: true,
  endpoints: {
    host: 'https://luafalcao.com/api',
    auth: {
      login: '/reencontre/auth/login',
      usuario: '/reencontre/auth/usuario',
      cadastro: '/reencontre/auth/cadastro',
      pre_cadastro: '/reencontre/auth/precadastro',
      reenvio_codigo_verificacao: '/reencontre/auth/reenvio/codigodeverificacao'
    },
    desaparecidos: '/reencontre/desaparecidos',
    anuncios_cadastrados: '/reencontre/desaparecidos/anuncios/cadastrados/paginados',
    anuncios_catalogo: '/reencontre/desaparecidos/anuncios/catalogo',
    quantidade_anuncios_cadastrados: '/reencontre/desaparecidos/anuncios/cadastrados/quantidade',
    quantidade: '/reencontre/desaparecidos/anuncios/quantidade',
    anexos: '/reencontre/anexos/upload',
    ping: '/reencontre/auth/ping',
    search: '/reencontre/desaparecidos/search',
    search_catalogo: '/reencontre/desaparecidos/search/catalogo',
    quantidadeItensRetornadosPesquisaDesaparecidosPorNome: '/reencontre/desaparecidos/search/quantidade',
    search_catalogo_quantidade: '/reencontre/desaparecidos/search/catalogo/quantidade',
    guardian: 'reencontre/auth/guardian'
  }
};
