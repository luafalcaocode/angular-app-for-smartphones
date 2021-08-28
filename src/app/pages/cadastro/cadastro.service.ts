import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CadastroComponent } from './cadastro.component';

import { LoginService } from '../../shared/services/login.service';
import { RevealWindowService } from '../../shared/components/reveal-window/reveal-window.service';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '../../../environments/environment';
import { DesaparecidoModel } from '../../models/desaparecido.model';

import { Message } from '../../shared/utils/message';


@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  usuarioEstaLogado: boolean;

  constructor(private loginService: LoginService, private revealService: RevealWindowService, private apiService: ApiService) {

  }

  initialize(cadastroComponent: CadastroComponent) {
    document.documentElement.scrollTop = 0;
    this.usuarioEstaLogado = this.loginService.getUsuarioEstaLogado();
    this.loginService.cadastroComponent = cadastroComponent;

    if (!this.usuarioEstaLogado) {
      this.revealService.open();
    }
  }

  cadastrarDesaparecido(dadosDoDesaparecido: DesaparecidoModel) {
     return this.apiService.post(environment.endpoints.desaparecidos, dadosDoDesaparecido);
  }

  fazerUploadFotos(fotos: FormData) {
    return this.apiService.upload(environment.endpoints.anexos, fotos);
  }

  removerCadastroDesaparecido(desaparecidoId: number) {
    return this.apiService.removerPorId(`${environment.endpoints.desaparecidos}/${desaparecidoId}`);
  }
}
