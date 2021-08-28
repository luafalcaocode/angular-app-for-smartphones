import { Injectable } from '@angular/core';

import { LoginService } from '../../shared/services/login.service';
import { ApiService } from '../../shared/services/api.service';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  usuarioEstaLogado: boolean;

  constructor(private loginService: LoginService, private apiService: ApiService) {
    this.usuarioEstaLogado = this.loginService.getUsuarioEstaLogado();
  }

  obterAnuncios(pagina: number, quantidade: number) {
    return this.apiService.get(`${environment.endpoints.anuncios_catalogo}?pagina=${pagina}&quantidade=${quantidade}`);
  }

  obterAnuncioPorId(id: number) {
    return this.apiService.get(`${environment.endpoints.desaparecidos}/${id}`);
  }

  initialize(homeComponent: any) {
    this.usuarioEstaLogado = this.loginService.estaLogado;
    this.loginService.homeComponent = homeComponent;

    return this.apiService.get(environment.endpoints.quantidade) ;
  }

  pesquisarDesaparecidoPorNome(filtro: string, pagina: number, quantidade: number) {
    return this.apiService.search(environment.endpoints.search_catalogo, filtro, pagina, quantidade);
  }

  obterQuantidadeAnunciosCadastrados() {
    return this.apiService.get(environment.endpoints.quantidade_anuncios_cadastrados);
  }
}
