// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endpoints: {
      host: 'https://localhost:44332',
    //  host: 'http://localhost/api',
    //  host: 'https://luafalcao.com/api',
   // host: 'https://localhost:5001',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
